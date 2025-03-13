import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 space-y-16">
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Sobre a UBPCT</h1>
          <p className="text-xl text-muted-foreground">
            União Brasileira de Psicanalistas e Terapeutas Clínicos
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Nossa Missão</h2>
            <p className="text-lg text-muted-foreground">
              A UBPCT tem como missão fortalecer a prática da psicanálise e
              terapias clínicas no Brasil, promovendo a excelência profissional,
              o desenvolvimento contínuo e a integração entre profissionais da
              saúde mental.
            </p>
            <p className="text-lg text-muted-foreground">
              Buscamos criar um ambiente de colaboração e aprendizado mútuo,
              onde o conhecimento e as melhores práticas são compartilhados para
              benefício dos profissionais e, consequentemente, de seus
              pacientes.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80"
              alt="Profissionais em reunião"
              className="w-full h-auto"
            />
          </div>
        </section>

        <section className="bg-slate-50 py-12 rounded-lg">
          <div className="container space-y-8">
            <h2 className="text-3xl font-semibold text-center">
              Nossos Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Excelência</h3>
                <p className="text-muted-foreground">
                  Comprometimento com os mais altos padrões de qualidade na
                  prática profissional e na formação continuada.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Ética</h3>
                <p className="text-muted-foreground">
                  Atuação baseada em princípios éticos sólidos, respeitando a
                  dignidade e os direitos de todos os envolvidos no processo
                  terapêutico.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Colaboração</h3>
                <p className="text-muted-foreground">
                  Promoção do intercâmbio de conhecimentos e experiências entre
                  profissionais, fortalecendo a comunidade de saúde mental.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-center">Nossa História</h2>
          <p className="text-lg text-muted-foreground">
            Fundada em 2010 por um grupo de psicanalistas e terapeutas
            comprometidos com o desenvolvimento da profissão no Brasil, a UBPCT
            surgiu da necessidade de criar uma entidade que representasse os
            interesses dos profissionais da área e promovesse a qualificação
            contínua.
          </p>
          <p className="text-lg text-muted-foreground">
            Ao longo dos anos, expandimos nossa atuação para incluir diversas
            abordagens terapêuticas, sempre mantendo o compromisso com a
            excelência e a ética profissional. Hoje, contamos com milhares de
            associados em todo o território nacional, oferecendo suporte,
            recursos e oportunidades de desenvolvimento para profissionais em
            diferentes estágios de carreira.
          </p>
        </section>

        <section className="bg-blue-50 py-12 rounded-lg text-center space-y-6">
          <h2 className="text-3xl font-semibold">
            Faça Parte da Nossa Comunidade
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de profissionais e tenha acesso a recursos
            exclusivos, oportunidades de networking e desenvolvimento
            profissional contínuo.
          </p>
          <Button size="lg" className="mt-4" asChild>
            <a href="/join">Associe-se Agora</a>
          </Button>
        </section>
      </main>
    </div>
  );
}
