import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  const { settings } = useLayoutSettings("header", "header");

  const styles = {
    backgroundColor: settings?.colors?.background || "white",
    color: settings?.colors?.text || "black",
    padding: settings?.spacing?.padding || "1rem",
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b shadow-sm"
      style={styles}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          {settings?.images?.logo ? (
            <img src={settings.images.logo} alt="Logo" className="h-8 w-auto" />
          ) : (
            <Logo />
          )}
          <nav className="flex items-center space-x-6">
            <Link
              to="/courses"
              className="text-sm font-medium hover:text-primary"
            >
              Cursos
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary"
            >
              Sobre
            </Link>
            <Link to="/join" className="text-sm font-medium hover:text-primary">
              Associe-se
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contato
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/dashboard">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/login">
              <User className="h-4 w-4 mr-2" />
              Área do Associado
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
