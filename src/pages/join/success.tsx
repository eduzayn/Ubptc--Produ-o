import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function JoinSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center space-y-4">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <h1 className="text-2xl font-bold">Pagamento Confirmado!</h1>
            <p className="text-muted-foreground">
              Sua associação foi realizada com sucesso. Complete seu perfil para
              acessar todos os benefícios.
            </p>
            <Button asChild className="w-full">
              <Link to="/profile">Completar Perfil</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
