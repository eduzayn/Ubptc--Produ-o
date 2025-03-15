import React from "react";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Verificar se há um token de recuperação na URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (!hashParams.get("access_token")) {
      navigate("/recover-password");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
      setIsSuccess(true);
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao redefinir sua senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <Breadcrumbs className="mb-6" />
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Redefinir Senha</CardTitle>
              <CardDescription>
                Crie uma nova senha para sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-4">
                  <p className="text-green-600 mb-4">
                    Senha redefinida com sucesso! Você será redirecionado para a página de login.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Nova Senha
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                        minLength={8}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirmar Nova Senha
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="********"
                        required
                        minLength={8}
                      />
                    </div>
                    
                    {error && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Voltar para o Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
