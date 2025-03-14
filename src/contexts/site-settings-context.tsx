import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type SiteSettings = Record<string, any>;

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  getSetting: (key: string, defaultValue?: any) => any;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: {},
  loading: true,
  getSetting: () => null,
});

export function useSiteSettingsContext() {
  return useContext(SiteSettingsContext);
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        if (import.meta.env.PROD) {
          const { data, error } = await supabase
            .from("site_settings")
            .select("key, value");

          if (error) throw error;

          const settingsObj = data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {} as SiteSettings);

          setSettings(settingsObj);
        } else {
          // Dados mockados para desenvolvimento
          setSettings({
            site_name: "UBPTC",
            site_description: "União Brasileira de Psicanalistas e Terapeutas Clínicos",
            primary_color: "#3b82f6",
            secondary_color: "#1e40af",
            contact_email: "contato@ubptc.org.br",
            contact_phone: "(11) 99999-9999",
            facebook_url: "https://facebook.com/ubptc",
            instagram_url: "https://instagram.com/ubptc",
            meta_title: "UBPTC - União Brasileira de Psicanalistas e Terapeutas Clínicos",
            meta_description: "A UBPTC é uma associação dedicada a conectar e fortalecer profissionais da saúde mental.",
          });
        }
      } catch (err) {
        console.error("Error loading site settings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const getSetting = (key: string, defaultValue: any = null) => {
    return settings[key] !== undefined ? settings[key] : defaultValue;
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, getSetting }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
