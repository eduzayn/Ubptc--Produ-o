import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Tables } from "@/types/supabase";

type Member = Tables<"members">;

interface DocumentApprovalDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export function DocumentApprovalDialog({
  member,
  open,
  onOpenChange,
  onUpdate,
}: DocumentApprovalDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApprove = async () => {
    if (!member) return;

    try {
      setLoading(true);
      setError("");

      const { error: updateError } = await supabase
        .from("members")
        .update({
          active: true,
          membership_expiry: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1),
          ).toISOString(),
        })
        .eq("id", member.id);

      if (updateError) throw updateError;

      onUpdate();
      onOpenChange(false);
    } catch (err) {
      console.error("Error approving member:", err);
      setError("Falha ao aprovar associado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!member) return;

    try {
      setLoading(true);
      setError("");

      const { error: updateError } = await supabase
        .from("members")
        .update({
          active: false,
          membership_expiry: null,
        })
        .eq("id", member.id);

      if (updateError) throw updateError;

      onUpdate();
      onOpenChange(false);
    } catch (err) {
      console.error("Error rejecting member:", err);
      setError("Falha ao rejeitar associado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise de Documentação</DialogTitle>
          <DialogDescription>
            Revise os documentos do associado para aprovação
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{member.full_name}</h3>
              <p className="text-sm text-muted-foreground">{member.cpf}</p>
            </div>
            <Badge
              variant="secondary"
              className={
                member.active
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {member.active ? "Ativo" : "Pendente"}
            </Badge>
          </div>

          <Tabs defaultValue="photo" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="photo">Foto</TabsTrigger>
              <TabsTrigger value="id">Documento</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="certificate">Certificado</TabsTrigger>
            </TabsList>

            <TabsContent value="photo" className="mt-4">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt="Foto"
                  className="max-h-[500px] mx-auto rounded-lg"
                />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Foto não enviada
                </p>
              )}
            </TabsContent>

            <TabsContent value="id" className="mt-4">
              {member.id_document_url ? (
                <iframe
                  src={member.id_document_url}
                  className="w-full h-[500px] rounded-lg"
                />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Documento não enviado
                </p>
              )}
            </TabsContent>

            <TabsContent value="address" className="mt-4">
              {member.address_proof_url ? (
                <iframe
                  src={member.address_proof_url}
                  className="w-full h-[500px] rounded-lg"
                />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Comprovante não enviado
                </p>
              )}
            </TabsContent>

            <TabsContent value="certificate" className="mt-4">
              {member.certificate_url ? (
                <iframe
                  src={member.certificate_url}
                  className="w-full h-[500px] rounded-lg"
                />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Certificado não enviado
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={loading}
          >
            Rejeitar
          </Button>
          <Button onClick={handleApprove} disabled={loading}>
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
