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
          setLoading(false);
        }
      } catch (err) {
        console.error("Error in loadSettings:", err);
        if (isMounted) {
          setSettings({
            colors: { background: "#ffffff", text: "#000000" },
            spacing: { padding: "1rem" },
          });
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
      const { error } = await supabase
        .from("layout_settings")
        .upsert({
          page_id: pageId,
          component_id: componentId,
          settings: newSettings,
        })
        .select();

      if (error) throw error;
      setSettings(newSettings);
      return true;
    } catch (err) {
      console.error("Error updating settings:", err);
      return false;
    }
  };

  return { settings, loading, updateSettings };
}
