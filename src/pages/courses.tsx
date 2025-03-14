import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCourses } from "@/lib/auth";
import type { Tables } from "@/types/supabase";

type Course = Tables<"courses">;

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        if (import.meta.env.DEV) {
          // Mock data for development
          const mockData = [
            {
              id: "1",
              title: "Fundamentos da Engenharia Civil",
              description:
                "Aprenda os conceitos básicos e fundamentais da engenharia civil moderna.",
              instructor: "Dr. Carlos Santos",
              duration: 40,
              price: 199.9,
              category: "Engenharia",
              image_url:
                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "2",
              title: "Gestão de Projetos para Engenheiros",
              description:
                "Metodologias e ferramentas para gerenciar projetos de engenharia com eficiência.",
              instructor: "Dra. Ana Oliveira",
              duration: 35,
              price: 249.9,
              category: "Gestão",
              image_url:
                "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "3",
              title: "Introdução à Associação",
              description:
                "Conheça os benefícios e funcionamento da nossa associação.",
              instructor: "Dra. Maria Silva",
              duration: 10,
              price: 0,
              category: "Institucional",
              image_url:
                "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ];
          setCourses(mockData as Course[]);
        } else {
          const { data, error } = await supabase
            .from("courses")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;
          setCourses(data || []);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(search.toLowerCase()) ||
      course.description?.toLowerCase().includes(search.toLowerCase()),
  );

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratuito";
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-8">
        <h1 className="text-3xl font-bold">Cursos Disponíveis</h1>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] rounded-lg border bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg overflow-hidden flex flex-col bg-white"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={
                      course.image_url ||
                      `https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80`
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">
                    {course.description}
                  </p>

                  <div className="mt-auto">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">
                        {course.category || "Curso"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg">
                        {course.price !== undefined
                          ? formatPrice(course.price)
                          : "R$ 199,90"}
                      </div>
                      <Button className="w-full" variant="default">
                        {course.price === 0 ? "Acessar Curso" : "Comprar Curso"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
