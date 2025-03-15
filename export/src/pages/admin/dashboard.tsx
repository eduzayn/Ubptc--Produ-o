import { AdminLayout } from "@/components/admin/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  CreditCard,
  Award,
  FileText,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingMembers: 0,
    totalCourses: 0,
    totalEbooks: 0,
    totalTickets: 0,
    openTickets: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        // Em desenvolvimento, usa dados mockados
        if (import.meta.env.DEV) {
          setStats({
            totalMembers: 125,
            activeMembers: 98,
            pendingMembers: 27,
            totalCourses: 12,
            totalEbooks: 35,
            totalTickets: 18,
            openTickets: 7,
          });
        } else {
          // Em produção, carrega do Supabase
          const [membersData, coursesData, ebooksData, ticketsData] =
            await Promise.all([
              supabase.from("members").select("id, active"),
              supabase.from("courses").select("id"),
              supabase.from("ebooks").select("id"),
              supabase.from("support_tickets").select("id, status"),
            ]);

          if (membersData.error) throw membersData.error;
          if (coursesData.error) throw coursesData.error;
          if (ebooksData.error) throw ebooksData.error;
          if (ticketsData.error) throw ticketsData.error;

          const activeMembers = membersData.data.filter((m) => m.active).length;
          const pendingMembers = membersData.data.filter(
            (m) => !m.active,
          ).length;
          const openTickets = ticketsData.data.filter(
            (t) => t.status === "open",
          ).length;

          setStats({
            totalMembers: membersData.data.length,
            activeMembers,
            pendingMembers,
            totalCourses: coursesData.data.length,
            totalEbooks: ebooksData.data.length,
            totalTickets: ticketsData.data.length,
            openTickets,
          });
        }
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
        // Fallback para dados mockados em caso de erro
        setStats({
          totalMembers: 125,
          activeMembers: 98,
          pendingMembers: 27,
          totalCourses: 12,
          totalEbooks: 35,
          totalTickets: 18,
          openTickets: 7,
        });
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total de Associados
                  </p>
                  <p className="text-3xl font-bold">
                    {loading ? "--" : stats.totalMembers}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Ativos</p>
                  <p className="font-medium">
                    {loading ? "--" : stats.activeMembers}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pendentes</p>
                  <p className="font-medium">
                    {loading ? "--" : stats.pendingMembers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cursos</p>
                  <p className="text-3xl font-bold">
                    {loading ? "--" : stats.totalCourses}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/admin/courses">Gerenciar Cursos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">E-books</p>
                  <p className="text-3xl font-bold">
                    {loading ? "--" : stats.totalEbooks}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/admin/library">Gerenciar Biblioteca</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Tickets de Suporte
                  </p>
                  <p className="text-3xl font-bold">
                    {loading ? "--" : stats.totalTickets}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Em Aberto</p>
                  <p className="font-medium">
                    {loading ? "--" : stats.openTickets}
                  </p>
                </div>
                <div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/admin/support">Ver Todos</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Associados</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="finances">Financeiro</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Associados</CardTitle>
                <CardDescription>
                  Gerencie os membros da associação, aprove documentos e emita
                  credenciais.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Button
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/members">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Listar Associados</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/members">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Aprovar Documentos</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/members">
                    <Award className="h-6 w-6 mb-2" />
                    <span>Credenciais</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Conteúdo</CardTitle>
                <CardDescription>
                  Gerencie cursos, e-books e outros recursos educacionais.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Button
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/courses">
                    <Award className="h-6 w-6 mb-2" />
                    <span>Cursos</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/library">
                    <BookOpen className="h-6 w-6 mb-2" />
                    <span>Biblioteca</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/layout">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Layout do Site</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento Financeiro</CardTitle>
                <CardDescription>
                  Acompanhe pagamentos, renovações e relatórios financeiros.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Button
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/finances">
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span>Pagamentos</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/finances">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Renovações</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  asChild
                >
                  <Link to="/admin/finances">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Relatórios</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
