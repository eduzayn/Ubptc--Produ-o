import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCourseCreated: () => void;
}

export function CourseFormDialog({
  open,
  onOpenChange,
  onCourseCreated,
}: CourseFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: 0,
    curriculum: "",
    workload: "",
    objectives: "",
    prerequisites: "",
    checkout_link: "",
    image_url: "",
    materials: [] as { name: string; url: string }[],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [materialName, setMaterialName] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const { error: insertError } = await supabase.from("courses").insert({
        title: formData.title,
        description: formData.description,
        instructor: formData.instructor,
        duration: formData.duration,
        curriculum: formData.curriculum,
        workload: formData.workload,
        objectives: formData.objectives,
        prerequisites: formData.prerequisites,
        checkout_link: formData.checkout_link,
        image_url: formData.image_url,
      });

      if (insertError) throw insertError;

      onCourseCreated();
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        instructor: "",
        duration: 0,
        curriculum: "",
        workload: "",
        objectives: "",
        prerequisites: "",
        checkout_link: "",
        image_url: "",
        materials: [],
      });
    } catch (err) {
      console.error("Error creating course:", err);
      setError("Falha ao criar curso. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = () => {
    if (materialName && materialUrl) {
      setFormData({
        ...formData,
        materials: [
          ...formData.materials,
          { name: materialName, url: materialUrl },
        ],
      });
      setMaterialName("");
      setMaterialUrl("");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("course_materials")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("course_materials").getPublicUrl(fileName);

      setMaterialUrl(publicUrl);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Falha ao fazer upload do arquivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Novo Curso</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo curso
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="materials">Materiais</TabsTrigger>
                <TabsTrigger value="payment">Pagamento</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="instructor">Instrutor</Label>
                        <Input
                          id="instructor"
                          value={formData.instructor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              instructor: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duração (horas)</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: parseInt(e.target.value) || 0,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Imagem do Curso</Label>
                    <ImageUpload
                      value={formData.image_url}
                      onChange={(url) =>
                        setFormData({ ...formData, image_url: url })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="curriculum">Matriz Curricular</Label>
                    <Textarea
                      id="curriculum"
                      value={formData.curriculum}
                      onChange={(e) =>
                        setFormData({ ...formData, curriculum: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workload">Carga Horária Detalhada</Label>
                    <Textarea
                      id="workload"
                      value={formData.workload}
                      onChange={(e) =>
                        setFormData({ ...formData, workload: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectives">Objetivos do Curso</Label>
                    <Textarea
                      id="objectives"
                      value={formData.objectives}
                      onChange={(e) =>
                        setFormData({ ...formData, objectives: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prerequisites">Pré-requisitos</Label>
                    <Textarea
                      id="prerequisites"
                      value={formData.prerequisites}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          prerequisites: e.target.value,
                        })
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="materialName">Nome do Material</Label>
                      <Input
                        id="materialName"
                        value={materialName}
                        onChange={(e) => setMaterialName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="materialUrl">URL do Material</Label>
                      <div className="flex gap-2">
                        <Input
                          id="materialUrl"
                          value={materialUrl}
                          onChange={(e) => setMaterialUrl(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="relative"
                          disabled={loading}
                        >
                          <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                            disabled={loading}
                          />
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddMaterial}
                    disabled={!materialName || !materialUrl}
                  >
                    Adicionar Material
                  </Button>

                  {formData.materials.length > 0 && (
                    <div className="border rounded-md p-4 mt-4">
                      <h4 className="font-medium mb-2">
                        Materiais Adicionados
                      </h4>
                      <ul className="space-y-2">
                        {formData.materials.map((material, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span>{material.name}</span>
                            <a
                              href={material.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Visualizar
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="checkout_link">Link de Checkout</Label>
                  <Input
                    id="checkout_link"
                    value={formData.checkout_link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkout_link: e.target.value,
                      })
                    }
                    placeholder="https://exemplo.com/checkout/curso-id"
                  />
                  <p className="text-sm text-muted-foreground">
                    Insira o link completo para a página de checkout deste
                    curso.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Curso"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
