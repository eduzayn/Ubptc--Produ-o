import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button-fix";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { EbookFormDialog } from "@/components/admin/ebook-form-dialog";
import { mockEbooks } from "@/lib/auth";
import type { Tables } from "@/types/supabase";

type Ebook = Tables<"ebooks">;

export default function AdminLibraryPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    loadEbooks();
  }, []);

  async function loadEbooks() {
    try {
      if (import.meta.env.DEV) {
        // Em desenvolvimento, usa dados mockados
        setEbooks(mockEbooks as Ebook[]);
      } else {
        // Em produção, carrega do Supabase
        const { data, error } = await supabase
          .from("ebooks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setEbooks(data || []);
      }
    } catch (err) {
      console.error("Error loading ebooks:", err);
      // Fallback para dados mockados em caso de erro
      setEbooks(mockEbooks as Ebook[]);
    } finally {
      setLoading(false);
    }
  }

  const filteredEbooks = ebooks.filter(
    (ebook) =>
      ebook.title.toLowerCase().includes(search.toLowerCase()) ||
      ebook.description.toLowerCase().includes(search.toLowerCase()) ||
      ebook.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Biblioteca</h1>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo E-book
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar e-books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-[360px] rounded-lg bg-muted animate-pulse"
                />
              ))
            : filteredEbooks.map((ebook) => (
                <Card
                  key={ebook.id}
                  className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={ebook.cover_url}
                      alt={ebook.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">{ebook.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {ebook.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      <EbookFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onEbookCreated={loadEbooks}
      />
    </AdminLayout>
  );
}
