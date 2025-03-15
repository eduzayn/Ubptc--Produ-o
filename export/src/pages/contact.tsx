import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Entre em Contato Conosco Agora
          </h1>
          <p className="text-muted-foreground">
            Estamos à disposição para atender suas dúvidas e solicitações
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Informações de Contato</h2>

            <div className="border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Endereço</h3>
                  <p className="text-muted-foreground">Av. Paulista, 1000</p>
                  <p className="text-muted-foreground">
                    Bela Vista, São Paulo - SP
                  </p>
                  <p className="text-muted-foreground">CEP: 01310-100</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <p className="text-muted-foreground">(11) 3456-7890</p>
                  <p className="text-muted-foreground">(11) 98765-4321</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    contato@associacaopro.com.br
                  </p>
                  <p className="text-muted-foreground">
                    suporte@associacaopro.com.br
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Horário de Atendimento</h3>
                  <p className="text-muted-foreground">
                    Segunda a Sexta: 9h às 18h
                  </p>
                  <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Envie sua Mensagem</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Preencha o formulário abaixo e entraremos em contato o mais breve
              possível
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome Completo
                  </label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Assunto
                </label>
                <Input id="subject" placeholder="Assunto da mensagem" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem aqui"
                  className="min-h-[150px]"
                />
              </div>

              <Button className="w-full bg-primary text-white" type="submit">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
