import { Header } from "./layout/header";
import { Button } from "./ui/button";
import {
  BookOpen,
  GraduationCap,
  Users,
  Award,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { CardHighlight } from "./ui/card-highlight";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="pt-16 pb-24 space-y-24">
        {/* Hero Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  União Brasileira de Psicanalistas e Terapeutas Clínicos
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                  Uma comunidade dedicada ao desenvolvimento profissional e
                  excelência na área da saúde mental.
                </p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="group bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <Link to="/join">
                      Associe-se
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Saiba mais
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&q=80"
                alt="Profissionais de Saúde Mental"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Benefícios para Associados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Faça parte da maior comunidade de psicanalistas e terapeutas
              clínicos do Brasil
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <CardHighlight
              icon={Users}
              title="Gestão de Associação"
              description="Faça seu cadastro online e gerencie sua associação de forma digital."
            />
            <CardHighlight
              icon={Award}
              title="Credencial Digital"
              description="Acesse sua credencial profissional com QR Code para validação."
            />
            <CardHighlight
              icon={GraduationCap}
              title="Cursos Exclusivos"
              description="Acesse cursos com descontos especiais para associados."
            />
            <CardHighlight
              icon={BookOpen}
              title="Biblioteca Digital"
              description="E-books e materiais exclusivos para seu desenvolvimento."
            />
            <CardHighlight
              icon={MessageCircle}
              title="Suporte Especializado"
              description="Atendimento multicanal com suporte via chat, WhatsApp e email."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
