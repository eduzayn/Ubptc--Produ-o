import React from "react";
import { Header } from "../components/layout/header";
import { useAuth } from "../lib/auth";
import { Navigate, Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Bem-vindo(a) à UBPTC</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Meu Perfil</h2>
            <p className="text-muted-foreground mb-4">
              Gerencie suas informações pessoais e credenciais.
            </p>
            <Link to="/profile" className="text-blue-600 hover:underline">
              Acessar perfil →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Cursos</h2>
            <p className="text-muted-foreground mb-4">
              Acesse cursos exclusivos para associados.
            </p>
            <Link to="/courses" className="text-blue-600 hover:underline">
              Ver cursos →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Biblioteca</h2>
            <p className="text-muted-foreground mb-4">
              E-books e materiais para seu desenvolvimento.
            </p>
            <Link to="/library" className="text-blue-600 hover:underline">
              Acessar biblioteca →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
