import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import type { Tables } from "@/types/supabase";

type Member = Tables<"members"> | any;

interface DigitalCredentialProps {
  member: Member;
}

export function DigitalCredential({ member }: DigitalCredentialProps) {
  const validationUrl = `https://ubpct.org.br/validate/${member.id}`;

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <Logo variant="white" />
          <Badge
            variant="secondary"
            className="bg-blue-500/20 text-white border-blue-400/30"
          >
            {member.active ? "Ativo" : "Pendente"}
          </Badge>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{member.full_name}</h3>
          <p className="text-blue-100">CPF: {member.cpf}</p>
          <p className="text-blue-100">RG: {member.rg}</p>
        </div>

        {member.membership_expiry && (
          <p className="text-sm text-blue-100">
            Válido até:{" "}
            {new Date(member.membership_expiry).toLocaleDateString()}
          </p>
        )}

        <div className="flex justify-center bg-white p-4 rounded-lg">
          <QRCodeSVG value={validationUrl} size={180} level="H" includeMargin />
        </div>

        <p className="text-xs text-center text-blue-100">
          Escaneie o QR Code para validar esta credencial
        </p>
      </CardContent>
    </Card>
  );
}
