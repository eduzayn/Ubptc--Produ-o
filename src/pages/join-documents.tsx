import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileCheck } from "lucide-react";

export default function JoinDocumentsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState({
    photo: false,
    document: false,
    address: false,
    certificate: false,
  });

  const handleFileUpload = (type: keyof typeof uploadStatus) => {
    setLoading(true);
    // Simulate file upload
    setTimeout(() => {
      setUploadStatus({ ...uploadStatus, [type]: true });
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (
      !uploadStatus.photo ||
      !uploadStatus.document ||
      !uploadStatus.address ||
      !uploadStatus.certificate
    ) {
      setError("Por favor, envie todos os documentos necessários.");
      return;
    }

    navigate("/join/success");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Documentação</h1>
            <p className="text-muted-foreground">
              Envie os documentos necessários para completar sua associação
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Documentos Obrigatórios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <DocumentUploadCard
                  title="Foto de Perfil"
                  description="Foto recente, fundo claro, formato 3x4"
                  uploaded={uploadStatus.photo}
                  loading={loading}
                  onUpload={() => handleFileUpload("photo")}
                />

                <DocumentUploadCard
                  title="Documento de Identidade"
                  description="RG ou CNH (frente e verso)"
                  uploaded={uploadStatus.document}
                  loading={loading}
                  onUpload={() => handleFileUpload("document")}
                />

                <DocumentUploadCard
                  title="Comprovante de Residência"
                  description="Conta de luz, água ou telefone (últimos 3 meses)"
                  uploaded={uploadStatus.address}
                  loading={loading}
                  onUpload={() => handleFileUpload("address")}
                />

                <DocumentUploadCard
                  title="Certificado Profissional"
                  description="Diploma ou certificado de conclusão de curso"
                  uploaded={uploadStatus.certificate}
                  loading={loading}
                  onUpload={() => handleFileUpload("certificate")}
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  Finalizar Cadastro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

interface DocumentUploadCardProps {
  title: string;
  description: string;
  uploaded: boolean;
  loading: boolean;
  onUpload: () => void;
}

function DocumentUploadCard({
  title,
  description,
  uploaded,
  loading,
  onUpload,
}: DocumentUploadCardProps) {
  return (
    <Card className={uploaded ? "border-green-500" : ""} role="button">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div
          className={`p-3 rounded-full ${uploaded ? "bg-green-100" : "bg-blue-50"}`}
        >
          {uploaded ? (
            <FileCheck className="h-6 w-6 text-green-600" />
          ) : (
            <Upload
              className={`h-6 w-6 ${loading ? "animate-pulse" : ""} text-blue-600`}
            />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Button
          variant={uploaded ? "outline" : "default"}
          onClick={onUpload}
          disabled={loading}
        >
          {uploaded ? "Enviado" : "Enviar Arquivo"}
        </Button>
      </CardContent>
    </Card>
  );
}
