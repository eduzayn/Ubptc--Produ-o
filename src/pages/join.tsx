import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { createCustomer, createPayment } from "@/lib/asaas";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Barcode, QrCode } from "lucide-react";

export default function JoinPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    rg: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // Criar cliente no Asaas
      const customerResponse = await createCustomer({
        name: formData.fullName,
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ""),
        phone: formData.phone.replace(/\D/g, ""),
        postalCode: formData.postalCode.replace(/\D/g, ""),
        address: formData.address,
        addressNumber: "0", // Adicionar campo no formulário se necessário
        province: formData.state,
        city: formData.city,
      });

      // Criar pagamento
      const paymentResponse = await createPayment({
        customerId: customerResponse.id,
        billingType: paymentMethod.toUpperCase() as
          | "CREDIT_CARD"
          | "BOLETO"
          | "PIX",
        value: 299.9, // Valor da anuidade
        dueDate: new Date().toISOString().split("T")[0],
        description: "Anuidade ASPM",
        ...(paymentMethod === "credit_card" && {
          creditCard: {
            holderName: formData.cardHolder,
            number: formData.cardNumber.replace(/\D/g, ""),
            expiryMonth: formData.cardExpiry.split("/")[0],
            expiryYear: "20" + formData.cardExpiry.split("/")[1],
            ccv: formData.cardCvv,
          },
          creditCardHolderInfo: {
            name: formData.cardHolder,
            email: formData.email,
            cpf: formData.cpf.replace(/\D/g, ""),
            postalCode: formData.postalCode.replace(/\D/g, ""),
            addressNumber: "0",
            phone: formData.phone.replace(/\D/g, ""),
          },
          installmentCount: 3, // Máximo de 3x
        }),
      });

      // Criar membro no Supabase
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .insert({
          full_name: formData.fullName,
          cpf: formData.cpf,
          rg: formData.rg,
          address: formData.address,
          user_id: user?.id || "pending",
          active: false,
        })
        .select()
        .single();

      if (memberError) throw memberError;

      // Criar registro de pagamento
      const { error: paymentError } = await supabase.from("payments").insert({
        member_id: memberData.id,
        amount: 299.9,
        payment_method: paymentMethod,
        status: "pending",
        asaas_id: paymentResponse.id,
        installments: paymentMethod === "credit_card" ? 3 : null,
      });

      if (paymentError) throw paymentError;

      // Redirecionar para página de sucesso
      navigate("/join/success");
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("Falha ao processar pagamento. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Associe-se à ASPM</h1>
            <p className="text-muted-foreground">
              Preencha seus dados e escolha a forma de pagamento
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) =>
                        setFormData({ ...formData, cpf: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input
                      id="rg"
                      value={formData.rg}
                      onChange={(e) =>
                        setFormData({ ...formData, rg: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">CEP</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="credit_card">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Cartão
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

                  <TabsContent value="credit_card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cardNumber: e.target.value,
                          })
                        }
                        required={paymentMethod === "credit_card"}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardHolder">Nome no Cartão</Label>
                        <Input
                          id="cardHolder"
                          value={formData.cardHolder}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cardHolder: e.target.value,
                            })
                          }
                          required={paymentMethod === "credit_card"}
                        />
                      </div>
                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            value={formData.cardExpiry}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardExpiry: e.target.value,
                              })
                            }
                            required={paymentMethod === "credit_card"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            value={formData.cardCvv}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardCvv: e.target.value,
                              })
                            }
                            required={paymentMethod === "credit_card"}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="boleto" className="space-y-4">
                    <p className="text-muted-foreground">
                      Após confirmar, você receberá o boleto por email para
                      pagamento.
                    </p>
                  </TabsContent>

                  <TabsContent value="pix" className="space-y-4">
                    <p className="text-muted-foreground">
                      Após confirmar, você receberá o QR Code do PIX para
                      pagamento.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Processando..." : "Finalizar Associação"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
