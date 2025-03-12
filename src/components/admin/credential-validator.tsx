import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button-fix";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeScanner } from "@/components/ui/qr-code-scanner";
import { Search } from "lucide-react";

export function CredentialValidator() {
  const navigate = useNavigate();
  const [credentialId, setCredentialId] = useState("");

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentialId) {
      navigate(`/validate/${credentialId}`);
    }
  };

  const handleQrScan = (result: string) => {
    // Extract the ID from the URL
    const idMatch = result.match(/\/validate\/([\w-]+)/);
    if (idMatch && idMatch[1]) {
      navigate(`/validate/${idMatch[1]}`);
    } else {
      // If the QR code doesn't contain a valid URL pattern, try using it directly
      navigate(`/validate/${result}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validar Credencial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleValidate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="credentialId">ID da Credencial</Label>
            <div className="flex gap-2">
              <Input
                id="credentialId"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="Digite o ID da credencial"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Validar
              </Button>
            </div>
          </div>
        </form>

        <div className="flex justify-center pt-2">
          <QRCodeScanner onScan={handleQrScan} />
        </div>
      </CardContent>
    </Card>
  );
}
