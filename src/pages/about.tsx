import { MainHeader } from "@/components/layout/main-header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <main>
        {/* Banner principal */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sobre a UBPCT
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              União Brasileira de Psicanalistas e Terapeutas Clínicos desde 2010
            </p>
          </div>
        </div>

        {/* Seção de missão e valores */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Nossa Missão
                </h2>
                <p className="text-gray-600">
                  Promover o desenvolvimento profissional dos associados,
                  credenciando e certificando profissionais, oferecendo cursos e
                  eventos para que os associados possam evoluir e certificar seu
                  desenvolvimento profissional.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">
                  Nossos Valores
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>
                      <strong>Excelência:</strong> Compromisso com altos padrões
                      de qualidade em todas as atividades
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>
                      <strong>Inovação:</strong> Busca constante por novas
                      abordagens e metodologias
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>
                      <strong>Colaboração:</strong> Trabalho em equipe e
                      compartilhamento de conhecimentos
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Equipe trabalhando"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção de história */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Nossa História
            </h2>

            <div className="space-y-12">
              <div className="flex items-start">
                <div className="bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span>1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fundação</h3>
                  <p className="text-gray-600">
                    A UBPCT foi fundada em 2010 por um grupo de profissionais
                    visionários que identificaram a necessidade de uma
                    associação que representasse os interesses dos psicanalistas
                    e terapeutas clínicos no Brasil.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span>2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Expansão Nacional
                  </h3>
                  <p className="text-gray-600">
                    Entre 2012 e 2015, a associação expandiu sua presença para
                    todas as regiões do país, estabelecendo representações
                    regionais e aumentando significativamente o número de
                    associados.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span>3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Plataforma Digital
                  </h3>
                  <p className="text-gray-600">
                    Em 2018, lançamos nossa plataforma digital de cursos e
                    certificações, democratizando o acesso ao conhecimento e
                    ampliando nossas possibilidades de atuação.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span>4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Reconhecimento Internacional
                  </h3>
                  <p className="text-gray-600">
                    A partir de 2020, estabelecemos parcerias com instituições
                    internacionais, permitindo intercâmbios, eventos globais e
                    reconhecimento mundial das certificações emitidas pela
                    UBPCT.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de diretoria */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Nossa Diretoria
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Carlos Mendes",
                  role: "Diretor Presidente",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=ffb300",
                },
                {
                  name: "Ana Oliveira",
                  role: "Diretora Técnica",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=b3e5fc",
                },
                {
                  name: "Roberto Santos",
                  role: "Diretor Acadêmico",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto&backgroundColor=ffcdd2",
                },
                {
                  name: "Patricia Lima",
                  role: "Diretora de Relações",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia&backgroundColor=c8e6c9",
                },
              ].map((member, i) => (
                <div key={i} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-24 w-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Faça parte da nossa associação
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Junte-se à comunidade e tenha acesso a cursos, certificações e
              benefícios exclusivos para associados.
            </p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link to="/join">Associe-se agora</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
