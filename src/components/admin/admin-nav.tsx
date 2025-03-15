import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  MessageCircle,
  Palette,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export function AdminNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex flex-col space-y-2">
      <Button
        variant={isActive("/admin/dashboard") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/dashboard">
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
      </Button>
      <Button
        variant={isActive("/admin/members") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/members">
          <Users className="h-4 w-4 mr-2" />
          Associados
        </Link>
      </Button>
      <Button
        variant={isActive("/admin/finances") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/finances">
          <DollarSign className="h-4 w-4 mr-2" />
          Financeiro
        </Link>
      </Button>
      <Button
        variant={isActive("/admin/courses") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/courses">
          <GraduationCap className="h-4 w-4 mr-2" />
          Cursos
        </Link>
      </Button>
      <Button
        variant={isActive("/admin/library") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/library">
          <BookOpen className="h-4 w-4 mr-2" />
          Biblioteca
        </Link>
      </Button>
      <Button
        variant={isActive("/admin/support") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/support">
          <MessageCircle className="h-4 w-4 mr-2" />
          Suporte
        </Link>
      </Button>
      <Button
        variant={isActive("/admin/layout") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/layout">
          <Palette className="h-4 w-4 mr-2" />
          Layout
        </Link>
      </Button>
      <Button
        variant={isActive("/admin/settings") ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/settings">
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </Link>
      </Button>
    </nav>
  );
}
