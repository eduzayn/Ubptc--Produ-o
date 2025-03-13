import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // Durante desenvolvimento, permite acesso sem autenticação
  if (import.meta.env.DEV) {
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

  return <>{children}</>;
}
