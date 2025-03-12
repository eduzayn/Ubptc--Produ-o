import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button-fix";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ColorPicker } from "@/components/ui/color-picker";
import { ImageUpload } from "@/components/ui/image-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const SECTIONS = [
  { id: "hero", name: "Seção Principal" },
  { id: "features", name: "Benefícios" },
  { id: "about", name: "Sobre" },
  { id: "cta", name: "Chamada para Ação" },
  { id: "header", name: "Cabeçalho" },
];

export function LayoutEditor() {
  const [settings, setSettings] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0].id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      if (import.meta.env.PROD) {
        // Em produção, carrega do Supabase
        const promises = SECTIONS.map(async (section) => {
          const { data, error } = await supabase
            .from("layout_settings")
            .select("*")
            .eq("page_id", "home")
            .eq("component_id", section.id)
            .single();

          if (error && error.code === "PGRST116") {
            // Se não existir, cria um novo registro
            const { data: newData, error: insertError } = await supabase
              .from("layout_settings")
              .insert({
                page_id: "home",
                component_id: section.id,
                settings: {
                  colors: { background: "#ffffff", text: "#000000" },
                  text: { title: section.name, description: "" },
                  images: {},
                },
              })
              .select()
              .single();

            if (insertError) throw insertError;
            return newData;
          } else if (error) {
            throw error;
          }

          return data;
        });

        const results = await Promise.all(promises);
        setSettings(results.filter(Boolean));
      } else {
        // Em desenvolvimento, usa dados mockados
        const mockSettings = SECTIONS.map((section) => ({
          id: section.id,
          component_id: section.id,
          page_id: "home",
          settings: {
            colors: { background: "#ffffff", text: "#000000" },
            text: { title: section.name, description: "Descrição de exemplo" },
            images: {},
          },
        }));
        setSettings(mockSettings);
      }
    } catch (err) {
      console.error("Error loading settings:", err);
      setError("Falha ao carregar configurações");

      // Fallback para dados mockados em caso de erro
      const mockSettings = SECTIONS.map((section) => ({
        id: section.id,
        component_id: section.id,
        page_id: "home",
        settings: {
          colors: { background: "#ffffff", text: "#000000" },
          text: { title: section.name, description: "" },
          images: {},
        },
      }));
      setSettings(mockSettings);
    } finally {
      setLoading(false);
    }
  }

  const updateSettings = async (componentId: string, newSettings: any) => {
    try {
      // Atualiza o estado local primeiro
      setSettings((prevSettings) =>
        prevSettings.map((s) =>
          s.component_id === componentId ? { ...s, settings: newSettings } : s,
        ),
      );

      // Em produção, salva no Supabase
      if (import.meta.env.PROD) {
        const { error } = await supabase
          .from("layout_settings")
          .upsert({
            page_id: "home",
            component_id: componentId,
            settings: newSettings,
          })
          .eq("page_id", "home")
          .eq("component_id", componentId);

        if (error) throw error;
      }
    } catch (err) {
      console.error("Error updating settings:", err);
      setError("Falha ao atualizar configurações");
    }
  };

  const getComponentSettings = (componentId: string) => {
    const setting = settings.find((s) => s.component_id === componentId);
    return (
      setting?.settings || {
        colors: { background: "#ffffff", text: "#000000" },
        text: { title: "", description: "" },
        images: {},
      }
    );
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/5">
        <div className="p-4">
          <h2 className="font-semibold mb-2">Seções</h2>
          <div className="space-y-1">
            {SECTIONS.map((section) => (
              <Button
                key={section.id}
                variant={selectedSection === section.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedSection(section.id)}
              >
                {section.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <div className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {SECTIONS.find((s) => s.id === selectedSection)?.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Edite o conteúdo e estilo desta seção
                </p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="space-y-6">
                <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
                <div className="h-40 bg-muted animate-pulse rounded-lg"></div>
                <div className="h-60 bg-muted animate-pulse rounded-lg"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={
                            getComponentSettings(selectedSection)?.text
                              ?.title || ""
                          }
                          onChange={(e) =>
                            updateSettings(selectedSection, {
                              ...getComponentSettings(selectedSection),
                              text: {
                                ...getComponentSettings(selectedSection).text,
                                title: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <Textarea
                          value={
                            getComponentSettings(selectedSection)?.text
                              ?.description || ""
                          }
                          onChange={(e) =>
                            updateSettings(selectedSection, {
                              ...getComponentSettings(selectedSection),
                              text: {
                                ...getComponentSettings(selectedSection).text,
                                description: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-medium">Estilo</h3>
                    <Separator className="my-4" />
                    <div className="grid gap-4">
                      <div>
                        <Label>Cor de Fundo</Label>
                        <ColorPicker
                          color={
                            getComponentSettings(selectedSection)?.colors
                              ?.background || "#ffffff"
                          }
                          onChange={(color) =>
                            updateSettings(selectedSection, {
                              ...getComponentSettings(selectedSection),
                              colors: {
                                ...getComponentSettings(selectedSection).colors,
                                background: color,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Cor do Texto</Label>
                        <ColorPicker
                          color={
                            getComponentSettings(selectedSection)?.colors
                              ?.text || "#000000"
                          }
                          onChange={(color) =>
                            updateSettings(selectedSection, {
                              ...getComponentSettings(selectedSection),
                              colors: {
                                ...getComponentSettings(selectedSection).colors,
                                text: color,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-medium">Imagem</h3>
                    <Separator className="my-4" />
                    <ImageUpload
                      value={
                        getComponentSettings(selectedSection)?.images?.main ||
                        ""
                      }
                      onChange={(url) =>
                        updateSettings(selectedSection, {
                          ...getComponentSettings(selectedSection),
                          images: {
                            ...getComponentSettings(selectedSection).images,
                            main: url,
                          },
                        })
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Preview Panel */}
      <div className="w-96 border-l bg-muted/5 p-4">
        <h2 className="font-semibold mb-4">Preview</h2>
        <div className="rounded-lg border bg-background p-4 h-[calc(100vh-8rem)] overflow-auto">
          {loading ? (
            <div className="h-full bg-muted animate-pulse rounded-lg"></div>
          ) : (
            <div
              style={{
                backgroundColor:
                  getComponentSettings(selectedSection)?.colors?.background ||
                  "#ffffff",
                color:
                  getComponentSettings(selectedSection)?.colors?.text ||
                  "#000000",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <h2 className="text-xl font-semibold mb-2">
                {getComponentSettings(selectedSection)?.text?.title ||
                  "Título da Seção"}
              </h2>
              <p className="mb-4">
                {getComponentSettings(selectedSection)?.text?.description ||
                  "Descrição da seção"}
              </p>
              {getComponentSettings(selectedSection)?.images?.main && (
                <img
                  src={getComponentSettings(selectedSection).images.main}
                  alt="Preview"
                  className="rounded-lg max-w-full"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
