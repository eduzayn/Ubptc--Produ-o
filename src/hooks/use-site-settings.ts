import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type SiteSettingCategory = 
  | "general" 
  | "appearance" 
  | "contact" 
  | "social" 
  | "seo" 
  | "advanced";

export type SiteSetting = {
  id: string;
  key: string;
  value: any;
  category: SiteSettingCategory;
  description: string | null;
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      
      if (import.meta.env.PROD) {
        // Em produção, carrega do Supabase
        const { data, error } = await supabase
          .from("site_settings")
          .select("*");

        if (error) throw error;
        
        setSettings(data || []);
      } else {
        // Em desenvolvimento, usa dados mockados
        setSettings([
          {
            id: "1",
            key: "site_name",
            value: "UBPTC",
            category: "general",
            description: "Nome do site",
          },
          {
            id: "2",
            key: "site_description",
            value: "União Brasileira de Psicanalistas e Terapeutas Clínicos",
            category: "general",
            description: "Descrição do site",
          },
          {
            id: "3",
            key: "primary_color",
            value: "#3b82f6",
            category: "appearance",
            description: "Cor primária do site",
          },
          {
            id: "4",
            key: "secondary_color",
            value: "#1e40af",
            category: "appearance",
            description: "Cor secundária do site",
          },
          {
            id: "5",
            key: "contact_email",
            value: "contato@ubptc.org.br",
            category: "contact",
            description: "Email de contato",
          },
          {
            id: "6",
            key: "contact_phone",
            value: "(11) 99999-9999",
            category: "contact",
            description: "Telefone de contato",
          },
          {
            id: "7",
            key: "facebook_url",
            value: "https://facebook.com/ubptc",
            category: "social",
            description: "URL do Facebook",
          },
          {
            id: "8",
            key: "instagram_url",
            value: "https://instagram.com/ubptc",
            category: "social",
            description: "URL do Instagram",
          },
          {
            id: "9",
            key: "meta_title",
            value: "UBPTC - União Brasileira de Psicanalistas e Terapeutas Clínicos",
            category: "seo",
            description: "Título para SEO",
          },
          {
            id: "10",
            key: "meta_description",
            value: "A UBPTC é uma associação dedicada a conectar e fortalecer profissionais da saúde mental.",
            category: "seo",
            description: "Descrição para SEO",
          },
        ]);
      }
    } catch (err) {
      console.error("Error loading site settings:", err);
      setError("Falha ao carregar configurações do site");
    } finally {
      setLoading(false);
    }
  }

  async function updateSetting(id: string, value: any) {
    try {
      setSettings((prev) =>
        prev.map((setting) =>
          setting.id === id ? { ...setting, value } : setting
        )
      );

      if (import.meta.env.PROD) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value, updated_at: new Date().toISOString() })
          .eq("id", id);

        if (error) throw error;
      }
      
      return true;
    } catch (err) {
      console.error("Error updating site setting:", err);
      return false;
    }
  }

  async function createSetting(newSetting: Omit<SiteSetting, "id">) {
    try {
      if (import.meta.env.PROD) {
        const { data, error } = await supabase
          .from("site_settings")
          .insert({
            key: newSetting.key,
            value: newSetting.value,
            category: newSetting.category,
            description: newSetting.description,
          })
          .select()
          .single();

        if (error) throw error;
        
        setSettings((prev) => [...prev, data]);
        return data.id;
      } else {
        // Em desenvolvimento, simula a criação
        const id = Math.random().toString(36).substring(2, 11);
        const setting = {
          id,
          ...newSetting,
        };
        
        setSettings((prev) => [...prev, setting]);
        return id;
      }
    } catch (err) {
      console.error("Error creating site setting:", err);
      return null;
    }
  }

  async function deleteSetting(id: string) {
    try {
      setSettings((prev) => prev.filter((setting) => setting.id !== id));

      if (import.meta.env.PROD) {
        const { error } = await supabase
          .from("site_settings")
          .delete()
          .eq("id", id);

        if (error) throw error;
      }
      
      return true;
    } catch (err) {
      console.error("Error deleting site setting:", err);
      return false;
    }
  }

  return {
    settings,
    loading,
    error,
    updateSetting,
    createSetting,
    deleteSetting,
    loadSettings,
  };
}
