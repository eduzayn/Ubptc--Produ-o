import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Barcode, QrCode } from "lucide-react";
import { asaas } from "@/lib/asaas";
import { MainHeader } from "@/components/layout/main-header";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criar cliente
      const customer = await asaas.customers.create({
        name: formData.name,
        email: formData.email,
        cpfCnpj: formData.cpf.replace(/\D/g, ""),
        phone: formData.phone.replace(/\D/g, ""),
      });

      // Criar pagamento
      const payment = await asaas.payments.create({
        customerId: customer.id,
        billingType:
          paymentMethod === "credit_card"
            ? "CREDIT_CARD"
            : paymentMethod === "boleto"
              ? "BOLETO"
              : "PIX",
        value: 399.9,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        description: "Anuidade UBPCT",
        ...(paymentMethod === "credit_card" && {
          creditCard: {
            holderName: formData.cardName,
            number: formData.cardNumber.replace(/\D/g, ""),
            expiryMonth: formData.cardExpiry.split("/")[0],
            expiryYear: "20" + formData.cardExpiry.split("/")[1],
            ccv: formData.cardCvv,
          },
          creditCardHolderInfo: {
            name: formData.name,
            email: formData.email,
            cpfCnpj: formData.cpf.replace(/\D/g, ""),
            postalCode: "00000000",
            addressNumber: "0",
            phone: formData.phone.replace(/\D/g, ""),
          },
        }),
      });

      setPaymentResult(payment);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Pagamento da Anuidade</h1>

          {paymentResult ? (
            <Card>
              <CardHeader>
                <CardTitle>Pagamento Processado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                  <p className="font-medium">
                    Seu pagamento foi processado com sucesso!
                  </p>
                  <p className="text-sm mt-2">
                    ID do pagamento: {paymentResult.id}
                  </p>
                </div>

                {paymentResult.pixQrCode && (
                  <div className="mt-4 text-center">
                    <h3 className="font-medium mb-2">QR Code PIX</h3>
                    <div className="bg-white p-4 inline-block rounded-lg border">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pix-example"
                        alt="QR Code PIX"
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-sm mt-2">
                      Escaneie o QR Code acima com o aplicativo do seu banco
                    </p>
                  </div>
                )}

                {paymentResult.bankSlipUrl && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Boleto Bancário</h3>
                    <Button className="w-full" asChild>
                      <a
                        href={paymentResult.bankSlipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Barcode className="h-4 w-4 mr-2" />
                        Visualizar Boleto
                      </a>
                    </Button>
                  </div>
                )}

                <Button
                  className="w-full mt-6"
                  onClick={() => navigate("/member-area")}
                >
                  Ir para Área do Associado
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Dados Pessoais
                      </h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <Input
                            id="cpf"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            placeholder="(00) 00000-0000"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Forma de Pagamento
                      </h2>
                      <Tabs
                        defaultValue="credit_card"
                        onValueChange={setPaymentMethod}
                      >
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

                        <TabsContent
                          value="credit_card"
                          className="space-y-4 pt-4"
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">
                                Número do Cartão
                              </Label>
                              <Input
                                id="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required={paymentMethod === "credit_card"}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Nome no Cartão</Label>
                              <Input
                                id="cardName"
                                placeholder="Nome como está no cartão"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                required={paymentMethod === "credit_card"}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">
                                Data de Validade
                              </Label>
                              <Input
                                id="cardExpiry"
                                placeholder="MM/AA"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                required={paymentMethod === "credit_card"}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvv">CVV</Label>
                              <Input
                                id="cardCvv"
                                placeholder="123"
                                value={formData.cardCvv}
                                onChange={handleInputChange}
                                required={paymentMethod === "credit_card"}
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="boleto" className="pt-4">
                          <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <p className="mb-4">
                              O boleto será gerado após a confirmação dos dados.
                            </p>
                            <p className="text-sm text-gray-600">
                              O prazo de compensação é de até 3 dias úteis.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="pix" className="pt-4">
                          <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <p className="mb-4">
                              O QR Code do PIX será gerado após a confirmação
                              dos dados.
                            </p>
                            <p className="text-sm text-gray-600">
                              O pagamento é processado instantaneamente.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total a pagar:</span>
                        <span className="text-xl font-bold">R$ 399,90</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Anuidade UBPCT - Plano Premium
                      </p>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Processando..." : "Finalizar Pagamento"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
