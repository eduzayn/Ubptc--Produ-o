import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
          // Mock courses for development
          setCourses([
            {
              id: "1",
              title: "Fundamentos da Engenharia Civil",
              description:
                "Aprenda os conceitos básicos e fundamentais da engenharia civil moderna.",
              instructor: "Dr. Carlos Santos",
              duration: 40,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "2",
              title: "Gestão de Projetos para Engenheiros",
              description:
                "Metodologias e ferramentas para gerenciar projetos de engenharia com eficiência.",
              instructor: "Dra. Ana Oliveira",
              duration: 30,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "3",
              title: "Introdução à Associação",
              description:
                "Conheça os benefícios e funcionamento da nossa associação.",
              instructor: "Dra. Maria Silva",
              duration: 5,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "4",
              title: "Normas Técnicas Atualizadas",
              description:
                "Estudo completo sobre as normas técnicas mais recentes na área de engenharia.",
              instructor: "Dr. João Pereira",
              duration: 25,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);
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
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase()),
  );

  // Function to get category tag for each course
  const getCourseCategory = (courseId: string) => {
    const categories: Record<string, string> = {
      "1": "Engenharia",
      "2": "Gestão",
      "3": "Institucional",
      "4": "Normas",
    };
    return categories[courseId] || "Geral";
  };

  // Function to get price for each course
  const getCoursePrice = (courseId: string) => {
    const prices: Record<string, number | null> = {
      "1": 199.9,
      "2": 249.9,
      "3": null, // Free course
      "4": 179.9,
    };
    return prices[courseId];
  };

  // Function to get course image
  const getCourseImage = (courseId: string) => {
    const images: Record<string, string> = {
      "1": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
      "2": "https://images.unsplash.com/photo-1581092160562-9a21079b1f30?w=800&q=80",
      "3": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      "4": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    };
    return (
      images[courseId] ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Cursos Disponíveis</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[300px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const price = getCoursePrice(course.id);
              const isGratuito = price === null;

              return (
                <Card
                  key={course.id}
                  className="overflow-hidden border border-gray-200"
                >
                  <div className="relative">
                    <img
                      src={getCourseImage(course.id)}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {price !== null && (
                      <div className="absolute top-3 left-3 bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded">
                        R$ {price.toFixed(2)}
                      </div>
                    )}
                    {isGratuito && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        Gratuito
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-4">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600">
                      {course.description}
                    </p>
                    <div className="pt-2">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {getCourseCategory(course.id)}
                      </span>
                    </div>
                    <Button className="w-full mt-2 bg-blue-900 hover:bg-blue-800">
                      {isGratuito ? "Acessar Curso" : "Comprar Curso"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
