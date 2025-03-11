import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Barcode, QrCode } from "lucide-react";
import { MainHeader } from "@/components/layout/main-header";

export default function JoinPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Associe-se à UBPCT
            </h1>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Faça parte da maior comunidade de psicanalistas e terapeutas
              clínicos do Brasil
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-4">
            <form className="space-y-8">
              <div>
                <h2 className="text-base font-semibold mb-4">Dados Pessoais</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input id="fullName" placeholder="Seu nome completo" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profissão</Label>
                    <Input id="profession" placeholder="Sua profissão" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Especialização</Label>
                    <Input
                      id="specialization"
                      placeholder="Sua especialização"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold mb-4">Endereço</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street">Rua</Label>
                    <Input id="street" placeholder="Nome da rua" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input id="number" placeholder="123" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" placeholder="Apto, Bloco, etc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" placeholder="Sua cidade" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input id="state" placeholder="UF" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold mb-4">
                  Plano de Associação
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Plano Básico</h3>
                    <p className="text-3xl font-bold mb-4">
                      R$ 199
                      <span className="text-sm font-normal text-gray-600">
                        /ano
                      </span>
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Credencial Digital
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Acesso à Biblioteca
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Suporte Básico
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-xs py-1 h-auto"
                      onClick={() => navigate("/payment")}
                    >
                      Selecionar
                    </Button>
                  </div>

                  <div className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer relative bg-blue-50">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      POPULAR
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Plano Premium
                    </h3>
                    <p className="text-3xl font-bold mb-4">
                      R$ 349
                      <span className="text-sm font-normal text-gray-600">
                        /ano
                      </span>
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Credencial Digital
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Acesso à Biblioteca
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Suporte Premium
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Descontos em Cursos
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Eventos Exclusivos
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-xs py-1 h-auto"
                      onClick={() => navigate("/payment")}
                    >
                      Selecionar
                    </Button>
                  </div>

                  <div className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Plano Master</h3>
                    <p className="text-3xl font-bold mb-4">
                      R$ 599
                      <span className="text-sm font-normal text-gray-600">
                        /ano
                      </span>
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Todos os benefícios Premium
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Mentoria Personalizada
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Cursos Gratuitos
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Certificações Exclusivas
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-xs py-1 h-auto"
                      onClick={() => navigate("/payment")}
                    >
                      Selecionar
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold mb-4">Pagamento</h2>
                <Tabs defaultValue="credit_card">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="credit_card">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Cartão de Crédito
                    </TabsTrigger>
                    <TabsTrigger value="boleto">
                      <Barcode className="h-4 w-4 mr-2" />
                      Boleto
                    </TabsTrigger>
                    <TabsTrigger value="pix">
                      <QrCode className="h-4 w-4 mr-2" />
                      PIX
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit_card" className="space-y-6 pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Nome como está no cartão"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiry">Data de Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="boleto" className="pt-6">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <p className="mb-4">
                        O boleto será gerado após a confirmação dos dados.
                      </p>
                      <p className="text-sm text-gray-600">
                        O prazo de compensação é de até 3 dias úteis.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="pix" className="pt-6">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <p className="mb-4">
                        O QR Code do PIX será gerado após a confirmação dos
                        dados.
                      </p>
                      <p className="text-sm text-gray-600">
                        O pagamento é processado instantaneamente.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="pt-4">
                <Button
                  type="button"
                  className="w-full bg-gray-900 hover:bg-gray-800"
                  onClick={() => navigate("/payment")}
                >
                  Finalizar Associação
                </Button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Ao clicar em "Finalizar Associação", você concorda com nossos{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
