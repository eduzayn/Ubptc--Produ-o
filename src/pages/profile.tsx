import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { DigitalCredential } from "@/components/profile/digital-credential";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { DocumentUpload } from "@/components/profile/document-upload";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/supabase";

type Member = Tables<"members">;

export default function ProfilePage() {
  const { user } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadMember();
  }, [user]);

  async function loadMember() {
    try {
      if (!user?.id) return;

      if (import.meta.env.DEV) {
        setMember({
          id: "123",
          full_name: "João da Silva",
          cpf: "123.456.789-00",
          rg: "12.345.678-9",
          active: true,
          membership_expiry: "2025-12-31",
          address: "Rua Exemplo, 123",
          user_id: "user123",
          photo_url: null,
          id_document_url: null,
          address_proof_url: null,
          certificate_url: null,
          created_at: null,
          updated_at: null,
        });
      } else {
        const { data, error } = await supabase
          .from("members")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        setMember(data);
      }
    } catch (err) {
      console.error("Error loading member:", err);
      setError("Falha ao carregar dados do perfil");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-[400px] bg-muted rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Perfil do Associado</h1>
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Editar Perfil
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Credencial Digital</CardTitle>
            </CardHeader>
            <CardContent>
              {member?.active ? (
                <DigitalCredential member={member} />
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                    <p>Sua credencial digital estará disponível após:</p>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      <li>Confirmação do pagamento</li>
                      <li>Envio e aprovação dos documentos necessários</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentUpload member={member} onUpdate={setMember} />
            </CardContent>
          </Card>
        </div>
      </main>

      <EditProfileDialog
        member={member}
        open={isEditing}
        onOpenChange={setIsEditing}
        onUpdate={setMember}
      />
    </div>
  );
}
