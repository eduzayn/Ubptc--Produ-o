import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { CourseCard } from "@/components/courses/course-card";
import { supabase } from "@/lib/supabase";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
          // @ts-ignore
          setCourses(mockCourses);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <Breadcrumbs className="mb-6" />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Catálogo de Cursos</h1>
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
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
