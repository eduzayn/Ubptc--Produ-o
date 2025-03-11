import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Award, CreditCard, LogOut, User } from "lucide-react";

export default function MemberAreaPage() {
  const [activeTab, setActiveTab] = useState("credential");

  // Dados mockados do associado
  const member = {
    id: "123456",
    name: "João Silva",
    profession: "Engenheiro Civil",
    issueDate: "10/03/2025",
    expiryDate: "10/03/2026",
    status: "Ativo",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=João&backgroundColor=ffcdd2",
  };

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
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Área do Associado
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="mb-4">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="h-24 w-24 rounded-full mx-auto"
                />
              </div>
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <p className="text-sm text-gray-600 mb-6">{member.profession}</p>

              <div className="space-y-2">
                <Button
                  variant={activeTab === "credential" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("credential")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Credencial
                </Button>
                <Button
                  variant={activeTab === "courses" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("courses")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Meus Cursos
                </Button>
                <Button
                  variant={activeTab === "certificates" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("certificates")}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Certificados
                </Button>
                <Button
                  variant={activeTab === "payments" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("payments")}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pagamentos
                </Button>
              </div>

              <div className="mt-8 pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "credential" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Credencial Digital</h1>

                <Card className="max-w-md mx-auto overflow-hidden">
                  <div className="bg-gray-900 text-white p-4 text-center">
                    <h2 className="text-xl font-bold">AssociaçãoPro</h2>
                    <p className="text-sm">Credencial de Associado</p>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col items-center">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="h-24 w-24 rounded-full mb-4"
                      />
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-gray-600">{member.profession}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-medium">{member.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Emissão:</span>
                        <span className="font-medium">{member.issueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Validade:</span>
                        <span className="font-medium">{member.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 font-medium">
                          {member.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-gray-200 w-32 h-32 flex items-center justify-center">
                        <p className="text-xs text-gray-500">
                          QR Code para validação
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Meus Cursos</h1>

                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 bg-gray-100 aspect-video md:aspect-square">
                            <img
                              src={`https://images.unsplash.com/photo-${1550000000000 + i * 1000}?w=500&q=80`}
                              alt="Course thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex-1">
                            <h3 className="text-lg font-semibold mb-2">
                              Curso de Exemplo {i}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Descrição breve do curso com informações
                              relevantes para o aluno.
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
                                  {i === 1
                                    ? "Em andamento"
                                    : i === 2
                                      ? "Concluído"
                                      : "Não iniciado"}
                                </span>
                              </div>
                              <Button size="sm">Acessar</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "certificates" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Meus Certificados</h1>

                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">
                            Certificado de Conclusão
                          </h3>
                          <Award className="h-5 w-5 text-yellow-500" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Curso de Exemplo {i}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Emitido em: 10/03/2023
                          </span>
                          <Button size="sm" variant="outline">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Meus Pagamentos</h1>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b">
                        <div>
                          <h3 className="font-semibold">Anuidade 2025</h3>
                          <p className="text-sm text-gray-600">Plano Premium</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">R$ 349,00</p>
                          <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-semibold">
                            Pago
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pb-4 border-b">
                        <div>
                          <h3 className="font-semibold">Curso Avançado</h3>
                          <p className="text-sm text-gray-600">
                            Técnicas Modernas
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">R$ 199,00</p>
                          <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-semibold">
                            Pago
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">Workshop Especial</h3>
                          <p className="text-sm text-gray-600">Evento Online</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">R$ 89,00</p>
                          <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs font-semibold">
                            Pendente
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
