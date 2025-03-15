import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Settings, User, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useSiteSettingsContext } from "@/contexts/site-settings-context";

export function Header() {
  const { settings } = useLayoutSettings("header", "header");
  const { getSetting } = useSiteSettingsContext();
  const { user, signOut } = useAuth();

  const styles = {
    backgroundColor: getSetting("header_background_color", settings?.colors?.background || "white"),
    color: getSetting("header_text_color", settings?.colors?.text || "black"),
    padding: getSetting("header_padding", settings?.spacing?.padding || "1rem"),
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
          {user ? (
            <>
              {user.user_metadata?.isAdmin && (
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/admin/dashboard">
                    <Settings className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Button variant="default" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Área do Associado
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
