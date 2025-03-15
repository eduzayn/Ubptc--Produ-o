import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CheckCircle, XCircle } from "lucide-react";

export default function ConfirmEmailPage() {
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se há um token de confirmação na URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    const accessToken = hashParams.get("access_token");
    
    if (type === "signup" && accessToken) {
      setIsConfirmed(true);
      
      // Redirecionar para login após 5 segundos
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } else {
      setIsConfirmed(false);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <Breadcrumbs className="mb-6" />
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Confirmação de Email</CardTitle>
              <CardDescription>
                Verificação da sua conta de email.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              {isConfirmed === null ? (
                <p>Verificando...</p>
              ) : isConfirmed ? (
                <div className="space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-700">Email Confirmado!</h3>
                    <p className="text-muted-foreground mt-2">
                      Sua conta foi verificada com sucesso. Você será redirecionado para a página de login em alguns segundos.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-700">Falha na Confirmação</h3>
                    <p className="text-muted-foreground mt-2">
                      Não foi possível confirmar seu email. O link pode ter expirado ou ser inválido.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/login">Ir para Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
