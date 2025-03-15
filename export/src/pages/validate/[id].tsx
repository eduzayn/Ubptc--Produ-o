import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import type { Tables } from "@/types/supabase";

type Member = Tables<"members">;

export default function ValidateCredentialPage() {
  const { id } = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMember() {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from("members")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setMember(data);

        // Log this validation attempt
        await supabase.from("credential_validations").insert({
          member_id: id,
          validated_at: new Date().toISOString(),
          ip_address: "anonymous",
        });
      } catch (err) {
        console.error("Error validating credential:", err);
        setError("Credencial não encontrada ou inválida");
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-md mx-auto text-center">
            <p>Verificando credencial...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-md mx-auto">
          {error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center space-y-4">
                <XCircle className="h-12 w-12 mx-auto text-red-500" />
                <h1 className="text-2xl font-bold text-red-700">
                  Credencial Inválida
                </h1>
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          ) : member ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                  <h1 className="text-2xl font-bold text-green-700">
                    Credencial Válida
                  </h1>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      {member.full_name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`${member.active ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {member.active ? "Ativo" : "Pendente"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">CPF</p>
                      <p>{member.cpf}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">RG</p>
                      <p>{member.rg}</p>
                    </div>
                  </div>

                  {member.membership_expiry && (
                    <div>
                      <p className="text-gray-500">Validade</p>
                      <p>
                        {new Date(
                          member.membership_expiry,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
    </div>
  );
}
