import { Header } from "./layout/header";
import { Button } from "./ui/button";
import {
  BookOpen,
  GraduationCap,
  Users,
  Award,
  MessageCircle,
  ArrowRight,
  Check,
  ChevronRight,
  Star,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import { CardHighlight } from "./ui/card-highlight";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="space-y-6">
                  <div className="inline-block bg-blue-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    Bem-vindo à UBPCT
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                    União Brasileira de Psicanalistas e Terapeutas Clínicos
                  </h1>
                  <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                    Uma comunidade dedicada ao desenvolvimento profissional e
                    excelência na área da saúde mental.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="group bg-white text-blue-700 hover:bg-blue-50"
                      asChild
                    >
                      <Link to="/join">
                        Associe-se
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Saiba mais
                    </Button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80"
                  alt="Profissionais"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  2500+
                </div>
                <p className="text-gray-600">Associados</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <p className="text-gray-600">Cursos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
                <p className="text-gray-600">Anos de Experiência</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  100%
                </div>
                <p className="text-gray-600">Satisfação</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-2">
                Nossos Benefícios
              </div>
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
              <CardHighlight
                icon={Star}
                title="Eventos Exclusivos"
                description="Participe de eventos, workshops e congressos com condições especiais."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Pronto para se juntar à UBPCT?
                </h2>
                <p className="text-lg text-blue-100">
                  Associe-se hoje e tenha acesso a todos os benefícios
                  exclusivos para membros.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-blue-300" />
                    <span>Credencial digital profissional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-blue-300" />
                    <span>Acesso à biblioteca de recursos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-blue-300" />
                    <span>Descontos em cursos e eventos</span>
                  </li>
                </ul>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  asChild
                >
                  <Link to="/join">
                    Associe-se agora
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Associados"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-2">
                Eventos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Próximos Eventos
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Participe dos nossos eventos e amplie sua rede de contatos
                profissionais
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-blue-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                    alt="Congresso de Psicanálise"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white rounded-lg px-3 py-1 text-sm font-medium">
                    Destaque
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-xl">
                    Congresso Brasileiro de Psicanálise
                  </h3>
                  <p className="text-gray-600">
                    O maior evento de psicanálise do Brasil, com palestrantes
                    nacionais e internacionais.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>15-17 de Outubro, 2024</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>São Paulo, SP</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Ver detalhes
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-blue-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80"
                    alt="Workshop de Terapia"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-xl">
                    Workshop: Técnicas Avançadas em Terapia
                  </h3>
                  <p className="text-gray-600">
                    Workshop prático com foco em novas abordagens terapêuticas e
                    estudos de caso.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>5 de Novembro, 2024</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>13:00 - 17:00</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Rio de Janeiro, RJ</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Ver detalhes
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-blue-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=800&q=80"
                    alt="Seminário Online"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-xl">
                    Seminário Online: Saúde Mental na Era Digital
                  </h3>
                  <p className="text-gray-600">
                    Discussão sobre os impactos da tecnologia na saúde mental e
                    novas abordagens.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>20 de Novembro, 2024</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>19:00 - 21:00</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Online</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600"
              >
                Ver todos os eventos
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-2">
                Depoimentos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                O que dizem nossos associados
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conheça as experiências de profissionais que fazem parte da
                nossa comunidade
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center text-yellow-400 mb-4">
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                </div>
                <p className="text-gray-600 mb-6">
                  "Fazer parte da UBPCT transformou minha carreira. Os recursos
                  disponíveis e a rede de contatos são inestimáveis para
                  qualquer profissional da área."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
                    alt="Ana Silva"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Dra. Ana Silva</h4>
                    <p className="text-sm text-gray-500">
                      Psicanalista, São Paulo
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center text-yellow-400 mb-4">
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                </div>
                <p className="text-gray-600 mb-6">
                  "Os cursos e eventos promovidos pela UBPCT são de altíssima
                  qualidade. Recomendo a todos os colegas que buscam
                  desenvolvimento profissional contínuo."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
                    alt="Carlos Mendes"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Dr. Carlos Mendes</h4>
                    <p className="text-sm text-gray-500">
                      Terapeuta, Rio de Janeiro
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center text-yellow-400 mb-4">
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                </div>
                <p className="text-gray-600 mb-6">
                  "A credencial digital da UBPCT trouxe mais credibilidade ao
                  meu trabalho. Além disso, o suporte oferecido pela associação
                  é excelente."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julia"
                    alt="Julia Santos"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Dra. Julia Santos</h4>
                    <p className="text-sm text-gray-500">
                      Psicoterapeuta, Belo Horizonte
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fique por dentro das novidades
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Assine nossa newsletter e receba atualizações sobre eventos,
              cursos e novidades da área.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="px-4 py-3 rounded-lg flex-1 text-gray-900"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Assinar
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">UBPCT</h3>
              <p className="text-gray-400 mb-4">
                União Brasileira de Psicanalistas e Terapeutas Clínicos
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Associe-se
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cursos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Eventos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Biblioteca
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Credencial Digital
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Área do Associado
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Suporte
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Av. Paulista, 1000</li>
                <li>São Paulo, SP</li>
                <li>contato@ubpct.org.br</li>
                <li>(11) 3456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 UBPCT - União Brasileira de Psicanalistas e Terapeutas
              Clínicos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
