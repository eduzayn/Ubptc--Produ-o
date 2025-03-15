import React from "react";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao enviar o email de recuperação.");
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
              <CardTitle>Recuperar Senha</CardTitle>
              <CardDescription>
                Informe seu email para receber instruções de recuperação de senha.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-4">
                  <p className="text-green-600 mb-4">
                    Email enviado com sucesso! Verifique sua caixa de entrada para instruções de recuperação de senha.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/login">Voltar para o Login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                    
                    {error && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar Email de Recuperação"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Lembrou sua senha?{" "}
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
