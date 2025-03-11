import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function MainHeader() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            UBPCT
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/courses" className="text-gray-600 hover:text-gray-900">
              Cursos
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              Sobre nós
            </Link>
            <Link to="/join" className="text-gray-600 hover:text-gray-900">
              Associe-se
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin-dashboard" title="Painel Administrativo">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/member-area">Área do Associado</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
