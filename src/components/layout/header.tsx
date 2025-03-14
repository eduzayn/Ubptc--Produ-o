import { MainNav } from "./main-nav";
import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
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
        <div className="flex items-center">
          {settings?.images?.logo ? (
            <img
              src={settings.images.logo}
              alt="Logo"
              className="h-8 w-auto mr-6"
            />
          ) : (
            <Logo className="mr-6" />
          )}
          <MainNav />
        </div>
        <div>
          {user ? (
            <Button variant="default" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
