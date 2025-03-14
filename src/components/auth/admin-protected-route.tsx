import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();

  // Durante desenvolvimento, permite acesso sem autenticação se DEV_ADMIN está definido
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_ADMIN === "true") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
