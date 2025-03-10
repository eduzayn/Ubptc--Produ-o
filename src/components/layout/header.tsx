import { MainNav } from "./main-nav";
import { useLayoutSettings } from "@/hooks/use-layout-settings";
import { Logo } from "@/components/ui/logo";

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
      <div className="container flex h-16 items-center">
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
    </header>
  );
}
