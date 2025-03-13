import { MainNav } from "./main-nav";
import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const { settings } = useLayoutSettings("header", "header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="default"
            size="sm"
            className="hidden md:flex"
          >
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 space-y-2">
            <MainNav className="flex-col items-start space-y-2 space-x-0" />
            <Button asChild variant="default" size="sm" className="w-full mt-4">
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
