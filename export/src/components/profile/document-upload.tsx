import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { validateFile } from "@/lib/file-validation";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UploadCloud, Upload } from "lucide-react";
import type { Tables } from "@/types/supabase";

type Member = Tables<"members">;

interface DocumentUploadProps {
  member: Member | null;
  onUpdate: (member: Member) => void;
}

type DocumentType = "photo" | "id_document" | "address_proof" | "certificate";

export function DocumentUpload({ member, onUpdate }: DocumentUploadProps) {
  const [loading, setLoading] = useState<DocumentType | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ url: string; type: string } | null>(
    null,
  );

  const uploadDocument = async (file: File, type: DocumentType) => {
    if (!member) return;

    try {
      setError("");
      setLoading(type);

      // Get the appropriate bucket based on document type
      const bucket = `member_${type === "photo" ? "photos" : type === "id_document" ? "documents" : type === "certificate" ? "certificates" : "address_proofs"}`;

      const fileName = `${member.id}/${new Date().getTime()}_${file.name}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName);

      // Verify document using AI
      const verificationResponse = await fetch(
        "https://ijgsotlpwhprqbilgqlz.supabase.co/functions/v1/verify-document",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            documentUrl: publicUrl,
            documentType: type,
            memberId: member.id,
          }),
        },
      );

      if (!verificationResponse.ok) {
        throw new Error("Failed to verify document");
      }

      const verificationResult = await verificationResponse.json();

      if (!verificationResult.isValid) {
        throw new Error(`Documento inválido: ${verificationResult.feedback}`);
      }

      const { data: updatedMember, error: updateError } = await supabase
        .from("members")
        .update({ [`${type}_url`]: publicUrl })
        .eq("id", member.id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (updatedMember) onUpdate(updatedMember);
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
      setError(`Falha ao enviar ${type}. Por favor, tente novamente.`);
    } finally {
      setLoading(null);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: DocumentType,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file, type);
    if (validationError) {
      setError(validationError.message);
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
          url: reader.result as string,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      setPreview({
        url: URL.createObjectURL(file),
        type: "application/pdf",
      });
    }

    uploadDocument(file, type);
  };

  const renderUploadButton = (type: DocumentType, label: string) => {
    const url = member?.[`${type}_url`];
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex items-center gap-4">
          <Button
            variant={url ? "outline" : "default"}
            className="relative"
            disabled={loading !== null}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, type)}
              accept=".jpg,.jpeg,.png,.pdf"
              disabled={loading !== null}
            />
            {loading === type ? (
              <Upload className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <UploadCloud className="h-4 w-4 mr-2" />
            )}
            {url ? "Atualizar" : "Enviar"}
          </Button>
          {url && (
            <>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                Visualizar
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (url.endsWith(".pdf")) {
                    setPreview({ url, type: "application/pdf" });
                  } else {
                    setPreview({ url, type: "image/jpeg" });
                  }
                }}
              >
                Preview
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-3xl">
          {preview?.type.startsWith("image/") ? (
            <img
              src={preview.url}
              alt="Preview"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          ) : preview?.type === "application/pdf" ? (
            <iframe
              src={preview.url}
              title="PDF Preview"
              className="w-full h-[80vh]"
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {renderUploadButton("photo", "Foto")}
      {renderUploadButton("id_document", "Documento de Identidade (RG/CNH)")}
      {renderUploadButton("address_proof", "Comprovante de Residência")}
      {renderUploadButton("certificate", "Certificado Profissional")}
    </div>
  );
}
