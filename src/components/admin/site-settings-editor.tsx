import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "@/components/ui/color-picker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Trash2 } from "lucide-react";
import { useSiteSettings, SiteSettingCategory, SiteSetting } from "@/hooks/use-site-settings";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SiteSettingsEditor() {
  const { settings, loading, error, updateSetting, createSetting, deleteSetting } = useSiteSettings();
  const [activeTab, setActiveTab] = useState<SiteSettingCategory>("general");
  const [newSettingOpen, setNewSettingOpen] = useState(false);
  const [newSetting, setNewSetting] = useState({
    key: "",
    value: "",
    category: "general" as SiteSettingCategory,
    description: "",
  });
  const [saveStatus, setSaveStatus] = useState<{ id: string; status: "saving" | "success" | "error" } | null>(null);

  const filteredSettings = settings.filter((setting) => setting.category === activeTab);

  const handleUpdateSetting = async (id: string, value: any) => {
    setSaveStatus({ id, status: "saving" });
    const success = await updateSetting(id, value);
    setSaveStatus({ id, status: success ? "success" : "error" });
    
    // Clear status after 2 seconds
    setTimeout(() => {
      setSaveStatus(null);
    }, 2000);
  };

  const handleCreateSetting = async () => {
    if (!newSetting.key || !newSetting.value) return;
    
    await createSetting(newSetting);
    setNewSettingOpen(false);
    setNewSetting({
      key: "",
      value: "",
      category: "general",
      description: "",
    });
  };

  const handleDeleteSetting = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta configuração?")) {
      await deleteSetting(id);
    }
  };

  const renderSettingEditor = (setting: SiteSetting) => {
    const isSaving = saveStatus?.id === setting.id && saveStatus.status === "saving";
    const isSuccess = saveStatus?.id === setting.id && saveStatus.status === "success";
    const isError = saveStatus?.id === setting.id && saveStatus.status === "error";
    
    // Renderiza diferentes editores com base no tipo de valor
    if (typeof setting.value === "string" && setting.key.includes("color")) {
      return (
        <div className="space-y-2">
          <ColorPicker
            color={setting.value}
            onChange={(color) => handleUpdateSetting(setting.id, color)}
          />
          {isSaving && <p className="text-sm text-muted-foreground">Salvando...</p>}
          {isSuccess && <p className="text-sm text-green-500">Salvo com sucesso!</p>}
          {isError && <p className="text-sm text-red-500">Erro ao salvar</p>}
        </div>
      );
    } else if (typeof setting.value === "string" && setting.key.includes("description")) {
      return (
        <div className="space-y-2">
          <Textarea
            value={setting.value}
            onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
            className="min-h-[100px]"
          />
          {isSaving && <p className="text-sm text-muted-foreground">Salvando...</p>}
          {isSuccess && <p className="text-sm text-green-500">Salvo com sucesso!</p>}
          {isError && <p className="text-sm text-red-500">Erro ao salvar</p>}
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          <Input
            value={setting.value}
            onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
          />
          {isSaving && <p className="text-sm text-muted-foreground">Salvando...</p>}
          {isSuccess && <p className="text-sm text-green-500">Salvo com sucesso!</p>}
          {isError && <p className="text-sm text-red-500">Erro ao salvar</p>}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configurações do Site</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações globais do site
          </p>
        </div>
        <Dialog open={newSettingOpen} onOpenChange={setNewSettingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Configuração
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Configuração</DialogTitle>
              <DialogDescription>
                Crie uma nova configuração para o site
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="key">Chave</Label>
                <Input
                  id="key"
                  value={newSetting.key}
                  onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                  placeholder="Ex: site_name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <Input
                  id="value"
                  value={newSetting.value}
                  onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={newSetting.category}
                  onValueChange={(value) => setNewSetting({ ...newSetting, category: value as SiteSettingCategory })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Geral</SelectItem>
                    <SelectItem value="appearance">Aparência</SelectItem>
                    <SelectItem value="contact">Contato</SelectItem>
                    <SelectItem value="social">Redes Sociais</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newSetting.description}
                  onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
                  placeholder="Descrição da configuração"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewSettingOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateSetting}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SiteSettingCategory)}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="social">Redes Sociais</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        {["general", "appearance", "contact", "social", "seo", "advanced"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4 mt-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="h-5 w-1/3 bg-muted animate-pulse rounded"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-10 bg-muted animate-pulse rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredSettings.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma configuração encontrada nesta categoria
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setNewSetting({ ...newSetting, category: category as SiteSettingCategory });
                      setNewSettingOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Configuração
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredSettings.map((setting) => (
                <Card key={setting.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{setting.description || setting.key}</CardTitle>
                        <CardDescription>{setting.key}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSetting(setting.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>{renderSettingEditor(setting)}</CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
