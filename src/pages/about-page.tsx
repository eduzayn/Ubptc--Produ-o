import { MainHeader } from "@/components/layout/main-header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

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
              União Brasileira de Psicanalistas e Terapeutas Clínicos
            </p>
          </div>
        </div>

        {/* Seção de história */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80"
                  alt="Nossa História"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Nossa História
                </h2>
                <p className="text-gray-600">
                  A União Brasileira de Psicanalistas e Terapeutas Clínicos
                  (UBPCT) foi fundada em 2010 por um grupo de profissionais
                  visionários que identificaram a necessidade de uma associação
                  que representasse os interesses dos psicanalistas e terapeutas
                  clínicos no Brasil.
                </p>
                <p className="text-gray-600">
                  Desde então, temos trabalhado incansavelmente para promover o
                  desenvolvimento profissional, a valorização e o reconhecimento
                  dos profissionais da área de saúde mental no Brasil,
                  contribuindo para a excelência dos serviços prestados à
                  sociedade.
                </p>
                <p className="text-gray-600">
                  Hoje, a UBPCT é reconhecida como uma das principais
                  associações de profissionais de saúde mental do país,
                  oferecendo suporte, credenciamento e oportunidades de
                  desenvolvimento para milhares de associados em todo o Brasil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de missão e valores */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Missão, Visão e Valores
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Missão
                </h3>
                <p className="text-gray-600">
                  Promover o desenvolvimento profissional, a valorização e o
                  reconhecimento dos profissionais da área de saúde mental no
                  Brasil, contribuindo para a excelência dos serviços prestados
                  à sociedade.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Visão
                </h3>
                <p className="text-gray-600">
                  Ser reconhecida como a principal referência para profissionais
                  de saúde mental no Brasil, promovendo a integração, o
                  desenvolvimento e a valorização da profissão.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Valores
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Excelência profissional</li>
                  <li>• Ética e responsabilidade</li>
                  <li>• Compromisso com a saúde mental</li>
                  <li>• Inovação e desenvolvimento contínuo</li>
                  <li>• Respeito à diversidade</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de equipe */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Nossa Equipe</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                Conheça os profissionais que lideram a UBPCT
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Carlos Mendes",
                  role: "Presidente",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
                  bio: "Psicanalista com mais de 20 anos de experiência, fundador da UBPCT e autor de diversos livros na área.",
                },
                {
                  name: "Dra. Fernanda Lima",
                  role: "Diretora Acadêmica",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda",
                  bio: "Especialista em psicoterapia cognitivo-comportamental, responsável pelos programas educacionais da associação.",
                },
                {
                  name: "Dr. Ricardo Alves",
                  role: "Diretor de Relações Institucionais",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
                  bio: "Terapeuta clínico com ampla experiência em gestão de instituições de saúde mental.",
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-24 w-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-700 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de benefícios */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Benefícios para Associados
              </h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                Ao se associar à UBPCT, você terá acesso a diversos benefícios
                exclusivos
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Credencial Digital",
                  description:
                    "Credencial profissional digital com QR Code para validação rápida e segura.",
                },
                {
                  title: "Cursos e Workshops",
                  description:
                    "Acesso a cursos, workshops e eventos exclusivos com preços especiais para associados.",
                },
                {
                  title: "Biblioteca Digital",
                  description:
                    "Acesso à nossa biblioteca digital com e-books, artigos e materiais exclusivos.",
                },
                {
                  title: "Networking Profissional",
                  description:
                    "Participe de uma comunidade de profissionais e amplie sua rede de contatos.",
                },
                {
                  title: "Suporte Jurídico",
                  description:
                    "Orientação jurídica especializada para questões relacionadas à prática profissional.",
                },
                {
                  title: "Visibilidade Profissional",
                  description:
                    "Inclusão no diretório de profissionais no site da UBPCT, aumentando sua visibilidade.",
                },
              ].map((benefit, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Faça parte da nossa comunidade
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Junte-se a milhares de profissionais e eleve sua carreira a um
              novo patamar
            </p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Associe-se agora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
