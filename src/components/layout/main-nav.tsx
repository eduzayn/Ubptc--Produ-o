import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import {
  BookOpen,
  GraduationCap,
  Home,
  UserCircle,
  MessageCircle,
  Settings,
  Info,
  LogIn,
} from "lucide-react";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className = "" }: MainNavProps) {
  const { user } = useAuth();
  return (
    <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`}>
      <Button asChild variant="ghost">
        <Link to="/">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/about">
          <Info className="h-4 w-4 mr-2" />
          Sobre Nós
        </Link>
      </Button>
      {user ? (
        <>
          <Button asChild variant="ghost">
            <Link to="/dashboard">
              <UserCircle className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/courses">
              <GraduationCap className="h-4 w-4 mr-2" />
              Cursos
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/library">
              <BookOpen className="h-4 w-4 mr-2" />
              Biblioteca
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/support">
              <MessageCircle className="h-4 w-4 mr-2" />
              Suporte
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/admin/dashboard">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Link>
          </Button>
        </>
      ) : (
        <Button asChild variant="default" className="ml-auto">
          <Link to="/login">
            <LogIn className="h-4 w-4 mr-2" />
            Entrar
          </Link>
        </Button>
      )}
    </nav>
  );
}
