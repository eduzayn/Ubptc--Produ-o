import { MainNav } from "./main-nav";
import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
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
          <Button asChild variant="default" size="sm">
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
