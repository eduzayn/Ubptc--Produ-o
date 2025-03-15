import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

export function Footer() {
  const { settings } = useLayoutSettings("footer", "footer");

  const styles = {
    backgroundColor: settings?.colors?.background || "#1e3a8a",
    color: settings?.colors?.text || "white",
    padding: settings?.spacing?.padding || "2rem 0",
  };

  return (
    <footer className="w-full" style={styles}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          <div className="space-y-4">
            <Logo variant="white" />
            <p className="text-sm text-blue-100">
              União Brasileira de Profissionais de Ciências e Tecnologia
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-blue-100 hover:text-white">
                  Cursos
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-blue-100 hover:text-white">
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-blue-100 hover:text-white">
                  Associe-se
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-100" />
                <span className="text-blue-100">contato@ubpct.org.br</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-100" />
                <span className="text-blue-100">(11) 3456-7890</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Área do Associado</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-blue-100 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-blue-100 hover:text-white">
                  Cadastro
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-blue-100 hover:text-white">
                  Meu Perfil
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-blue-100 hover:text-white">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 pb-4">
          <p className="text-center text-sm text-blue-100">
            © {new Date().getFullYear()} UBPCT - União Brasileira de
            Profissionais de Ciências e Tecnologia. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
