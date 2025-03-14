import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LogIn, Settings } from "lucide-react";
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
      className="sticky top-0 z-50 w-full border-b shadow-sm bg-white"
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
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Cursos
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Sobre
            </Link>
            <Link
              to="/join"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Associe-se
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Contato
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/admin/dashboard">
            <Settings className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link to="/login" className="flex items-center">
              <LogIn className="h-4 w-4 mr-2" />
              Área do Associado
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
