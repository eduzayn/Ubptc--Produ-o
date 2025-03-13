import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { EbookCard } from "@/components/library/ebook-card";
import { CategoryFilter } from "@/components/library/category-filter";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Tables } from "@/types/supabase";

type Ebook = Tables<"ebooks">;

export default function LibraryPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function loadEbooks() {
      try {
        const { data, error } = await supabase
          .from("ebooks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setEbooks(data || []);
      } catch (err) {
        console.error("Error loading ebooks:", err);
      } finally {
        setLoading(false);
      }
    }

    loadEbooks();
  }, []);

  const categories = Array.from(
    new Set(ebooks.map((ebook) => ebook.category)),
  ).sort();

  const filteredEbooks = ebooks.filter(
    (ebook) =>
      (selectedCategory === null || ebook.category === selectedCategory) &&
      (ebook.title.toLowerCase().includes(search.toLowerCase()) ||
        ebook.description.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Biblioteca Digital</h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar e-books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[360px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredEbooks.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} />
            ))}
          </div>
        )}

        {!loading && filteredEbooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum e-book encontrado para os filtros selecionados.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
