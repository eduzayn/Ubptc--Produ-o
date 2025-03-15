import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-muted-foreground mb-8">
            A página que você está procurando não existe ou foi movida.
            Verifique o URL ou retorne para a página inicial.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/">Página Inicial</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/support">Contatar Suporte</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
