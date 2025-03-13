import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Clock, GraduationCap } from "lucide-react";
import { CourseFormDialog } from "@/components/admin/course-form-dialog";
import type { Tables } from "@/types/supabase";

type Course = Tables<"courses">;

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Cursos</h1>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[200px] rounded-lg bg-muted animate-pulse"
                />
              ))
            : filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{course.instructor}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      <CourseFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCourseCreated={loadCourses}
      />
    </AdminLayout>
  );
}
