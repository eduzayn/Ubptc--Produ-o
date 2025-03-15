import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useLayoutSettings(pageId: string, componentId: string) {
  const [settings, setSettings] = useState<any>({
    colors: { background: "#ffffff", text: "#000000" },
    spacing: { padding: "1rem" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        // Em ambiente de produção, tenta carregar as configurações do Supabase
        if (import.meta.env.PROD) {
          const { data, error } = await supabase
            .from("layout_settings")
            .select("settings")
            .eq("page_id", pageId)
            .eq("component_id", componentId)
            .maybeSingle();

          if (isMounted) {
            if (error) {
              console.error("Error loading settings:", error);
              // Usar configurações padrão em caso de erro
              setSettings({
                colors: { background: "#ffffff", text: "#000000" },
                spacing: { padding: "1rem" },
              });
            } else {
              setSettings(
                data?.settings || {
                  colors: { background: "#ffffff", text: "#000000" },
                  spacing: { padding: "1rem" },
                },
              );
            }
          }
        } else {
          // Em ambiente de desenvolvimento, usa configurações padrão
          if (isMounted) {
            setSettings({
              colors: { background: "#ffffff", text: "#000000" },
              spacing: { padding: "1rem" },
              images: { logo: null },
              text: {
                title: "UBPCT",
                description:
                  "União Brasileira de Psicanalistas e Terapeutas Clínicos",
              },
            });
          }
        }
      } catch (err) {
        console.error("Error in loadSettings:", err);
        if (isMounted) {
          setSettings({
            colors: { background: "#ffffff", text: "#000000" },
            spacing: { padding: "1rem" },
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, [pageId, componentId]);

  const updateSettings = async (newSettings: any) => {
    try {
      if (import.meta.env.PROD) {
        const { error } = await supabase
          .from("layout_settings")
          .upsert({
            page_id: pageId,
            component_id: componentId,
            settings: newSettings,
          })
          .select();

        if (error) throw error;
      }
      setSettings(newSettings);
      return true;
    } catch (err) {
      console.error("Error updating settings:", err);
      return false;
    }
  };

  return { settings, loading, updateSettings };
}
