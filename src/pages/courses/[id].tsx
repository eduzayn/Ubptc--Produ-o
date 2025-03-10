import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, GraduationCap, PlayCircle, FileText } from "lucide-react";
import {
  mockCourses,
  mockCourseMaterials,
  mockRecordedClasses,
} from "@/lib/auth";
import type { Tables } from "@/types/supabase";

type Course = Tables<"courses">;
type CourseMaterial = Tables<"course_materials">;
type RecordedClass = Tables<"recorded_classes">;

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [classes, setClasses] = useState<RecordedClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourseData() {
      try {
        if (import.meta.env.DEV) {
          const mockCourse = mockCourses.find((c) => c.id === id);
          const courseMaterials = mockCourseMaterials.filter(
            (m) => m.course_id === id,
          );
          const recordedClasses = mockRecordedClasses.filter(
            (c) => c.course_id === id,
          );

          setCourse(mockCourse || null);
          setMaterials(
            courseMaterials.map((m) => ({
              ...m,
              created_at: new Date().toISOString(),
            })),
          );
          setClasses(
            recordedClasses.map((c) => ({
              ...c,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })),
          );
        } else {
          const [courseData, materialsData, classesData] = await Promise.all([
            supabase.from("courses").select("*").eq("id", id).single(),
            supabase.from("course_materials").select("*").eq("course_id", id),
            supabase
              .from("recorded_classes")
              .select("*")
              .eq("course_id", id)
              .order("order"),
          ]);

          if (courseData.error) throw courseData.error;
          if (materialsData.error) throw materialsData.error;
          if (classesData.error) throw classesData.error;

          setCourse(courseData.data);
          setMaterials(materialsData.data || []);
          setClasses(classesData.data || []);
        }
      } catch (err) {
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCourseData();
  }, [id]);

  if (loading || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="h-[400px] rounded-lg bg-muted animate-pulse" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{course.duration}h</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <span>{course.instructor}</span>
              </div>
            </div>

            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
                <TabsTrigger value="materials">Materiais</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                {classes.map((class_, index) => (
                  <Card key={class_.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <PlayCircle className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-medium">{class_.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {class_.description}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Assistir
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="materials" className="space-y-4">
                {materials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-medium">{material.title}</h3>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={material.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <Card className="h-fit">
            <CardContent className="p-6 space-y-6">
              <Button className="w-full" size="lg">
                Matricular-se
              </Button>
              <div className="space-y-4">
                <h3 className="font-semibold">Este curso inclui:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" />
                    {classes.length} aulas em vídeo
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {materials.length} materiais complementares
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
