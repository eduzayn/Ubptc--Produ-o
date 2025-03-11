import { MainHeader } from "@/components/layout/main-header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <div className="text-xl font-bold text-gray-900">UBPCT</div>
          </div>
          <div className="flex justify-center space-x-6 pb-2">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a
              href="/courses"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cursos
            </a>
            <a
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sobre nós
            </a>
            <a
              href="/join"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Associe-se
            </a>
            <a
              href="/contact"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Contato
            </a>
            <a
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Área do Associado
            </a>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Entre em Contato
            </h1>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Estamos à disposição para atender suas dúvidas e solicitações
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Informações de Contato</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Endereço</h3>
                    <p className="text-gray-600 text-sm">
                      Av. Paulista, 1000
                      <br />
                      São Paulo, SP, 01310-100
                      <br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telefone</h3>
                    <p className="text-gray-600 text-sm">
                      +55 (11) 99999-9999
                      <br />
                      +55 (11) 3333-3333
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600 text-sm">
                      contato@associacaopro.com.br
                      <br />
                      suporte@associacaopro.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Horário de Atendimento</h3>
                    <p className="text-gray-600 text-sm">
                      Segunda a Sexta: 9h às 17h
                      <br />
                      Sábado: 9h às 12h
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">
                  Nossa Localização
                </h2>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Mapa será carregado aqui</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Envie sua Mensagem</h2>
              <p className="text-sm text-gray-600 mb-6">
                Preencha o formulário abaixo e entraremos em contato o mais
                breve possível
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder=""
                    className="min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AssociaçãoPro</h3>
              <p className="text-gray-400 text-sm">
                Plataforma completa para gestão de associados, cursos e
                certificação.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/courses" className="text-gray-400 hover:text-white">
                    Cursos
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="/join" className="text-gray-400 hover:text-white">
                    Associe-se
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Área do Associado</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Credencial Digital
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Meus Cursos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Certificados
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contato@associacaopro.com.br</li>
                <li>+55 (11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2023 AssociaçãoPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
