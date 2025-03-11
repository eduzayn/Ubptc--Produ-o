import { Card, CardContent } from "@/components/ui/card";
import { FileText, BookOpen, Award } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-6 text-center">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Principais Recursos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-gray-700" />}
            title="Credencial Digital"
            description="Credenciais digitais com QR Code para validação rápida e segura dos associados."
          />

          <FeatureCard
            icon={<BookOpen className="h-8 w-8 text-gray-700" />}
            title="Cursos Online"
            description="Acesso a cursos, e-books, vídeo aulas e materiais exclusivos para associados."
          />

          <FeatureCard
            icon={<Award className="h-8 w-8 text-gray-700" />}
            title="Certificação"
            description="Certificados digitais emitidos automaticamente após a conclusão dos cursos."
          />
        </div>
      </div>
    </section>
  );
}
