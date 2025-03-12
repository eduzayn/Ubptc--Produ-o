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
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminDashboard() {
  // Dados mockados - em uma aplicação real, viriam da sua API
  const stats = {
    totalUsers: 256,
    pendingApprovals: 12,
    totalCourses: 18,
    activeCourses: 15,
    totalRevenue: 25680.5,
    monthlyRevenue: 4350.75,
    totalCertificates: 189,
    monthCertificates: 23,
    totalLibraryItems: 42,
    monthlyDownloads: 156,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Associados
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.pendingApprovals} aprovações pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeCourses} cursos ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receita Total
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {stats.totalRevenue.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                R$ {stats.monthlyRevenue.toLocaleString("pt-BR")} este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Biblioteca</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalLibraryItems}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.monthlyDownloads} downloads este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sistema de Abas */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Associados</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Associados Recentes</CardTitle>
                <CardDescription>
                  Lista dos últimos associados cadastrados na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">USR-001</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          João Silva
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          joao.silva@email.com
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          15/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">USR-002</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Maria Oliveira
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          maria.oliveira@email.com
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          14/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pendente
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">USR-003</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Carlos Santos
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          carlos.santos@email.com
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          13/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link to="/admin/members">Ver Todos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cursos Recentes</CardTitle>
                <CardDescription>
                  Lista dos últimos cursos adicionados à plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Curso
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Instrutor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Alunos
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">CRS-001</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Fundamentos da Psicanálise
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Dr. Paulo Freud
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">45</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">CRS-002</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Terapia Cognitivo-Comportamental
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Dra. Ana Beck
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">32</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">CRS-003</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Neuropsicologia Aplicada
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Dr. Carlos Luria
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">28</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Novo
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link to="/admin/courses">Ver Todos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Materiais da Biblioteca</CardTitle>
                <CardDescription>
                  Últimos materiais adicionados à biblioteca digital.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Título
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Categoria
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Downloads
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">LIB-001</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Manual de Diagnóstico Psicológico
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">E-book</td>
                        <td className="px-4 py-3 whitespace-nowrap">78</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          10/09/2023
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">LIB-002</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Técnicas de Entrevista Clínica
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">PDF</td>
                        <td className="px-4 py-3 whitespace-nowrap">45</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          08/09/2023
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">LIB-003</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Fundamentos da Psicoterapia
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">E-book</td>
                        <td className="px-4 py-3 whitespace-nowrap">33</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          05/09/2023
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link to="/admin/library">Ver Todos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pagamentos Recentes</CardTitle>
                <CardDescription>
                  Últimas transações financeiras na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Associado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Curso
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">PAY-001</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          João Silva
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Fundamentos da Psicanálise
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          R$ 199,90
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          15/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Concluído
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">PAY-002</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Maria Oliveira
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Terapia Cognitivo-Comportamental
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          R$ 249,90
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          14/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Concluído
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">PAY-003</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Carlos Santos
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Anuidade UBPCT
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          R$ 299,90
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          13/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pendente
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link to="/admin/finances">Ver Todos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Certificados Emitidos</CardTitle>
                <CardDescription>
                  Últimos certificados emitidos na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Associado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Curso
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          CERT-001
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          João Silva
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Fundamentos da Psicanálise
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          15/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Button variant="outline" size="sm">
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          CERT-002
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Maria Oliveira
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Terapia Cognitivo-Comportamental
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          14/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Button variant="outline" size="sm">
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          CERT-003
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Carlos Santos
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          Neuropsicologia Aplicada
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          13/09/2023
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Button variant="outline" size="sm">
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>Ver Todos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
