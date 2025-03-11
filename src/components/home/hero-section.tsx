import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Plataforma Completa para Associações
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Credenciamento digital, cursos online, certificações e gestão completa
          para associados em um único lugar.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800" asChild>
            <Link to="/join">Associe-se</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/courses">Ver Cursos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
