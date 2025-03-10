import { MainNav } from "./main-nav";
import { useLayoutSettings } from "@/hooks/use-layout-settings";

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
          <span className="text-xl font-bold mr-6">UBPCT</span>
        )}
        <MainNav />
      </div>
    </header>
  );
}
