import { MainHeader } from "@/components/layout/main-header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">
            Cursos Disponíveis
          </h1>

          <div className="relative max-w-md mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Buscar cursos..." className="pl-10" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Curso 1 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                  alt="Fundamentos da Engenharia Civil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Fundamentos da Engenharia Civil
                </h3>
                <p className="text-gray-600 mb-4">
                  Aprenda os conceitos básicos e fundamentais da engenharia
                  civil moderna.
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Engenharia
                  </span>
                  <span className="font-semibold">R$ 199,90</span>
                </div>
                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                  Comprar Curso
                </Button>
              </div>
            </div>

            {/* Curso 2 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&q=80"
                  alt="Gestão de Projetos para Engenheiros"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Gestão de Projetos para Engenheiros
                </h3>
                <p className="text-gray-600 mb-4">
                  Metodologias e ferramentas para gerenciar projetos de
                  engenharia com eficiência.
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Gestão
                  </span>
                  <span className="font-semibold">R$ 249,90</span>
                </div>
                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                  Comprar Curso
                </Button>
              </div>
            </div>

            {/* Curso 3 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                  alt="Introdução à Associação"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Introdução à Associação
                </h3>
                <p className="text-gray-600 mb-4">
                  Conheça os benefícios e funcionamento da nossa associação.
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Institucional
                  </span>
                  <span className="font-semibold text-green-600">Gratuito</span>
                </div>
                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                  Acessar Curso
                </Button>
              </div>
            </div>

            {/* Curso 4 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Normas Técnicas Atualizadas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Normas Técnicas Atualizadas
                </h3>
                <p className="text-gray-600 mb-4">
                  Estudo completo das normas técnicas mais recentes para
                  profissionais.
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Regulamentação
                  </span>
                  <span className="font-semibold">R$ 179,90</span>
                </div>
                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                  Comprar Curso
                </Button>
              </div>
            </div>

            {/* Curso 5 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                  alt="Liderança para Profissionais Técnicos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Liderança para Profissionais Técnicos
                </h3>
                <p className="text-gray-600 mb-4">
                  Desenvolva habilidades de liderança para gerenciar equipes
                  técnicas.
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Liderança
                  </span>
                  <span className="font-semibold">R$ 299,90</span>
                </div>
                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                  Comprar Curso
                </Button>
              </div>
            </div>

            {/* Curso 6 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                  alt="Ética Profissional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Ética Profissional
                </h3>
                <p className="text-gray-600 mb-4">
                  Princípios éticos e responsabilidades no exercício da
                  profissão.
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Ética
                  </span>
                  <span className="font-semibold">R$ 149,90</span>
                </div>
                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                  Comprar Curso
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
