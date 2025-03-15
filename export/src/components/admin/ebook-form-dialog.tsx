import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageUpload } from "@/components/ui/image-upload";

interface EbookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEbookCreated: () => void;
}

export function EbookFormDialog({
  open,
  onOpenChange,
  onEbookCreated,
}: EbookFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    cover_url: "",
    file_url: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      if (!formData.cover_url) {
        setError("Por favor, faça upload da capa do e-book");
        setLoading(false);
        return;
      }

      if (!formData.file_url) {
        setError("Por favor, faça upload do arquivo do e-book");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("ebooks").insert({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        cover_url: formData.cover_url,
        file_url: formData.file_url,
      });

      if (insertError) throw insertError;

      onEbookCreated();
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        cover_url: "",
        file_url: "",
      });
    } catch (err) {
      console.error("Error creating ebook:", err);
      setError("Falha ao criar e-book. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from("ebooks")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("ebooks").getPublicUrl(fileName);

      setFormData({ ...formData, file_url: publicUrl });
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Falha ao fazer upload do arquivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Novo E-book</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo e-book
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Arquivo do E-book</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="relative"
                      disabled={loading}
                    >
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileUpload}
                        accept=".pdf,.epub"
                        disabled={loading}
                      />
                      Upload do Arquivo
                    </Button>
                    {formData.file_url && (
                      <span className="text-sm text-green-600">
                        Arquivo enviado com sucesso
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Capa do E-book</Label>
                <ImageUpload
                  value={formData.cover_url}
                  onChange={(url) =>
                    setFormData({ ...formData, cover_url: url })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar E-book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
