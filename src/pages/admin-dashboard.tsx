import { useState } from "react";
import { Button } from "@/components/ui/button-fix";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  GraduationCap,
  BookOpen,
  MessageCircle,
  BarChart2,
  Settings,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-gray-900">AssociaçãoPro</div>
            <nav className="hidden md:flex space-x-6">
              <a href="/courses" className="text-gray-600 hover:text-gray-900">
                Cursos
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">
                Sobre
              </a>
              <a href="/join" className="text-gray-600 hover:text-gray-900">
                Associe-se
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">
                Contato
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Área do Associado
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Painel Administrativo
              </h2>

              <div className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Visão Geral
                </Button>
                <Button
                  variant={activeTab === "members" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("members")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Associados
                </Button>
                <Button
                  variant={activeTab === "finances" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("finances")}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Financeiro
                </Button>
                <Button
                  variant={activeTab === "courses" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("courses")}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Cursos
                </Button>
                <Button
                  variant={activeTab === "library" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("library")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Biblioteca
                </Button>
                <Button
                  variant={activeTab === "support" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("support")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Suporte
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Visão Geral</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total de Associados
                          </p>
                          <h3 className="text-2xl font-bold">1,248</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Receita Mensal
                          </p>
                          <h3 className="text-2xl font-bold">R$ 42.580</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Cursos Ativos</p>
                          <h3 className="text-2xl font-bold">24</h3>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                          <GraduationCap className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Novos Associados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between pb-2 border-b last:border-0 last:pb-0"
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                                <img
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                                  alt="User avatar"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Usuário Exemplo {i}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Associado desde{" "}
                                  {new Date().toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Ver
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Atividades Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            icon: <Users className="h-4 w-4" />,
                            text: "Novo associado registrado",
                            time: "2 minutos atrás",
                          },
                          {
                            icon: <DollarSign className="h-4 w-4" />,
                            text: "Pagamento recebido",
                            time: "1 hora atrás",
                          },
                          {
                            icon: <GraduationCap className="h-4 w-4" />,
                            text: "Novo curso publicado",
                            time: "3 horas atrás",
                          },
                          {
                            icon: <MessageCircle className="h-4 w-4" />,
                            text: "Novo ticket de suporte",
                            time: "5 horas atrás",
                          },
                          {
                            icon: <BookOpen className="h-4 w-4" />,
                            text: "Novo e-book adicionado",
                            time: "1 dia atrás",
                          },
                        ].map((activity, i) => (
                          <div key={i} className="flex items-start">
                            <div className="bg-gray-100 p-2 rounded-full mr-3">
                              {activity.icon}
                            </div>
                            <div>
                              <p className="font-medium">{activity.text}</p>
                              <p className="text-sm text-gray-500">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "members" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gerenciar Associados</h1>
                <p>Conteúdo da seção de associados será exibido aqui.</p>
              </div>
            )}

            {activeTab === "finances" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gerenciar Finanças</h1>
                <p>Conteúdo da seção financeira será exibido aqui.</p>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gerenciar Cursos</h1>
                <p>Conteúdo da seção de cursos será exibido aqui.</p>
              </div>
            )}

            {activeTab === "library" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gerenciar Biblioteca</h1>
                <p>Conteúdo da seção de biblioteca será exibido aqui.</p>
              </div>
            )}

            {activeTab === "support" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gerenciar Suporte</h1>
                <p>Conteúdo da seção de suporte será exibido aqui.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Configurações</h1>
                <p>Conteúdo da seção de configurações será exibido aqui.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
