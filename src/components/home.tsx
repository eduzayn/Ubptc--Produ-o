import { Header } from "./layout/header";
import { Button } from "./ui/button";
import {
  BookOpen,
  GraduationCap,
  Users,
  Award,
  MessageCircle,
  ArrowRight,
  Calendar,
  Video,
  UserPlus,
  Globe,
  FileText,
  Shield,
  Star,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import { CardHighlight } from "./ui/card-highlight";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSiteSettingsContext } from "@/contexts/site-settings-context";

function Home() {
  const { loading: settingsLoading } = useSiteSettingsContext();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set loading to false after a short delay to ensure content is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="pt-16 pb-24 space-y-24">
        {/* Hero Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Associação reconhecida e regulamentada
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  Conectando Profissionais da Saúde Mental em Todo o Brasil
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                  A UBPTC é uma associação online dedicada a unir e fortalecer psicanalistas, 
                  terapeutas cognitivo-comportamentais e especialistas de diversas abordagens terapêuticas, 
                  eliminando barreiras geográficas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="group bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <Link to="/join">
                      Associe-se Agora
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/about">
                      Conheça os Benefícios
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1920&auto=format&fit=crop"
                alt="Profissionais da Saúde Mental"
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/fallback-image.jpg";
                }}
              />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mx-auto">
              <Star className="h-4 w-4 mr-2" />
              Exclusivo para Associados
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Benefícios para Associados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ao se associar, você tem acesso a uma série de benefícios exclusivos 
              para seu desenvolvimento profissional
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <CardHighlight
              icon={Calendar}
              title="Eventos Exclusivos"
              description="Participe de eventos com descontos especiais e algumas edições gratuitas."
            />
            <CardHighlight
              icon={GraduationCap}
              title="Seminários e Workshops"
              description="Acesse seminários e workshops contínuos ministrados por profissionais renomados."
            />
            <CardHighlight
              icon={Users}
              title="Grupos de Estudo Online"
              description="Participe de grupos de estudo semanais, promovendo trocas ricas e aprofundamento teórico."
            />
            <CardHighlight
              icon={Video}
              title="Supervisão para Psicanalistas"
              description="Encontros de supervisão oferecendo suporte e aprimoramento contínuo para sua prática."
            />
            <CardHighlight
              icon={Award}
              title="Credencial Digital"
              description="Valide suas credenciais dentro de uma associação reconhecida e regulamentada."
            />
            <CardHighlight
              icon={BookOpen}
              title="Biblioteca Digital"
              description="E-books e materiais exclusivos para seu desenvolvimento profissional contínuo."
            />
          </div>
        </div>
        {/* Events and Workshops Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mx-auto">
                <Calendar className="h-4 w-4 mr-2" />
                Eventos e Workshops
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Eventos Exclusivos para Associados
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Participe de eventos exclusivos, com descontos especiais e algumas edições gratuitas
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 bg-blue-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-white opacity-75" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    Mensal
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Seminários Temáticos</h3>
                  <p className="text-gray-600 mb-4">
                    Seminários mensais com profissionais renomados sobre temas atuais da psicanálise e terapias clínicas.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>2 horas de duração</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 bg-indigo-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-16 w-16 text-white opacity-75" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                    Trimestral
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Workshops Práticos</h3>
                  <p className="text-gray-600 mb-4">
                    Workshops trimestrais com foco em técnicas e abordagens práticas para o consultório.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>4 horas de duração</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 bg-purple-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="h-16 w-16 text-white opacity-75" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    Anual
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Congresso UBPTC</h3>
                  <p className="text-gray-600 mb-4">
                    Congresso anual com palestras, mesas redondas e networking entre profissionais de todo o Brasil.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>3 dias de evento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Groups and Supervision Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mx-auto">
              <Users className="h-4 w-4 mr-2" />
              Grupos de Estudo e Supervisão
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Aprendizado Contínuo e Troca de Experiências
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Participe de grupos de estudo online semanais e encontros de supervisão para psicanalistas
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-white p-4 rounded-full shadow-md">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">Grupos de Estudo Online</h3>
                <p className="text-gray-600">
                  Encontros semanais para discussão de textos, casos clínicos e temas relevantes para a prática profissional. 
                  Um espaço para trocas ricas e aprofundamento teórico com colegas de todo o Brasil.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Semanal</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Online</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Certificado</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-white p-4 rounded-full shadow-md">
                <Video className="h-12 w-12 text-purple-600" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">Supervisão para Psicanalistas</h3>
                <p className="text-gray-600">
                  Encontros de supervisão com profissionais experientes, oferecendo suporte e aprimoramento contínuo 
                  para sua prática clínica. Um espaço seguro para discutir casos e aprimorar técnicas.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Quinzenal</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Online</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Confidencial</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mx-auto">
              <Star className="h-4 w-4 mr-2" />
              Depoimentos
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              O Que Dizem Nossos Associados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conheça as experiências de profissionais que já fazem parte da nossa comunidade
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 border-4 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" 
                    alt="Dra. Ana Silva"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/fallback-avatar.jpg";
                    }}
                  />
                </div>
              </div>
              <div className="pt-6 space-y-4">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-gray-600 italic">
                  "Os grupos de estudo online da UBPTC transformaram minha prática clínica. A troca com colegas de diferentes regiões do país ampliou minha visão e abordagem terapêutica."
                </p>
                <div>
                  <h4 className="font-semibold">Dra. Ana Silva</h4>
                  <p className="text-sm text-gray-500">Psicanalista, São Paulo</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 border-4 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                    alt="Dr. Carlos Mendes"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/fallback-avatar.jpg";
                    }}
                  />
                </div>
              </div>
              <div className="pt-6 space-y-4">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-gray-600 italic">
                  "A credencial digital da UBPTC trouxe mais credibilidade para meu trabalho. Os seminários e workshops são de altíssima qualidade, com profissionais de referência na área."
                </p>
                <div>
                  <h4 className="font-semibold">Dr. Carlos Mendes</h4>
                  <p className="text-sm text-gray-500">Terapeuta Cognitivo-Comportamental, Rio de Janeiro</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 border-4 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                    alt="Dra. Patrícia Almeida"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/fallback-avatar.jpg";
                    }}
                  />
                </div>
              </div>
              <div className="pt-6 space-y-4">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-gray-600 italic">
                  "Mesmo morando em uma cidade pequena, consigo participar de eventos e supervisões de alto nível. A UBPTC eliminou as barreiras geográficas para meu desenvolvimento profissional."
                </p>
                <div>
                  <h4 className="font-semibold">Dra. Patrícia Almeida</h4>
                  <p className="text-sm text-gray-500">Psicoterapeuta, Manaus</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Barriers Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  <Globe className="h-4 w-4 mr-2" />
                  Sem Barreiras Geográficas
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Conectando Profissionais de Todo o Brasil
                </h2>
                <p className="text-lg text-gray-600">
                  A UBPTC elimina barreiras geográficas, criando um ambiente onde profissionais de todas as regiões do país 
                  podem interagir, compartilhar experiências e validar suas credenciais dentro de uma associação reconhecida e regulamentada.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Video className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Encontros online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Networking nacional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Award className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Credenciais digitais</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=1920&auto=format&fit=crop" 
                    alt="Mapa do Brasil" 
                    className="rounded-xl shadow-lg relative z-10"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/fallback-image.jpg";
                    }}
                  />
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-600 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-indigo-600 rounded-full animate-ping animation-delay-300"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-purple-600 rounded-full animate-ping animation-delay-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation and Security Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mx-auto">
              <Shield className="h-4 w-4 mr-2" />
              Segurança e Documentação
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Associação Reconhecida e Regulamentada
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A UBPTC possui Regimento Interno e documentação oficial, garantindo segurança para seus associados
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Documentação Oficial</h3>
              <p className="text-gray-600">
                Regimento interno e documentação oficial que garantem a legitimidade da associação e dos benefícios oferecidos aos membros.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Segurança Garantida</h3>
              <p className="text-gray-600">
                Proteção de dados e informações dos associados, com processos seguros e transparentes para todas as atividades da associação.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <img 
                  src="https://www.asaas.com/wp-content/uploads/2022/05/logo-asaas-simbolo.svg" 
                  alt="Asaas" 
                  className="h-8 w-8"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/fallback-logo.jpg";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Pagamento Seguro</h3>
              <p className="text-gray-600">
                Integração eficiente com o gateway de pagamento Asaas, tornando o processo de associação simples e seguro.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Faça Parte da Nossa Comunidade de Profissionais
              </h2>
              <p className="text-xl opacity-90">
                Junte-se a milhares de psicanalistas e terapeutas clínicos em um espaço moderno, 
                intuitivo e atraente para seu desenvolvimento profissional.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg"
                asChild
              >
                <Link to="/join">
                  Associe-se Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
