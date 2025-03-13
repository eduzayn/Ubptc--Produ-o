import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../shared/cors.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_KEY")!;
const googleApiKey = Deno.env.get("GOOGLE_API_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface DocumentVerificationResult {
  isValid: boolean;
  confidence: number;
  feedback?: string;
  detectedText?: string;
}

async function verifyDocument(
  imageUrl: string,
  documentType: string,
): Promise<DocumentVerificationResult> {
  try {
    // Call Google Cloud Vision API
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${googleApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: [
            {
              image: { source: { imageUri: imageUrl } },
              features: [
                { type: "TEXT_DETECTION" },
                { type: "DOCUMENT_TEXT_DETECTION" },
                { type: "FACE_DETECTION" },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();
    const textAnnotations = data.responses[0]?.textAnnotations || [];
    const detectedText = textAnnotations[0]?.description || "";

    // Validation logic based on document type
    switch (documentType) {
      case "photo":
        const faces = data.responses[0]?.faceAnnotations || [];
        if (faces.length !== 1) {
          return {
            isValid: false,
            confidence: 0,
            feedback: "A foto deve conter exatamente um rosto visível",
          };
        }
        return {
          isValid: true,
          confidence: faces[0].detectionConfidence,
          feedback: "Foto válida",
        };

      case "id_document":
        // Check for CPF/RG patterns
        const hasIdPatterns =
          /\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}-?\d{1}/.test(
            detectedText,
          );
        return {
          isValid: hasIdPatterns,
          confidence: hasIdPatterns ? 0.9 : 0.1,
          feedback: hasIdPatterns
            ? "Documento válido"
            : "Documento não contém números de CPF ou RG válidos",
          detectedText,
        };

      case "address_proof":
        // Check for address-related keywords
        const addressKeywords = [
          "rua",
          "avenida",
          "av",
          "alameda",
          "cep",
          "bairro",
          "número",
        ];
        const hasAddressKeywords = addressKeywords.some((keyword) =>
          detectedText.toLowerCase().includes(keyword),
        );
        return {
          isValid: hasAddressKeywords,
          confidence: hasAddressKeywords ? 0.8 : 0.2,
          feedback: hasAddressKeywords
            ? "Comprovante válido"
            : "Documento não parece ser um comprovante de endereço",
          detectedText,
        };

      case "certificate":
        // Check for certificate-related keywords
        const certificateKeywords = [
          "certificado",
          "diploma",
          "conclusão",
          "curso",
        ];
        const hasCertKeywords = certificateKeywords.some((keyword) =>
          detectedText.toLowerCase().includes(keyword),
        );
        return {
          isValid: hasCertKeywords,
          confidence: hasCertKeywords ? 0.85 : 0.15,
          feedback: hasCertKeywords
            ? "Certificado válido"
            : "Documento não parece ser um certificado profissional",
          detectedText,
        };

      default:
        return {
          isValid: false,
          confidence: 0,
          feedback: "Tipo de documento inválido",
        };
    }
  } catch (error) {
    console.error("Error verifying document:", error);
    return {
      isValid: false,
      confidence: 0,
      feedback: "Erro ao processar documento",
    };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentUrl, documentType, memberId } = await req.json();

    // Verify document
    const result = await verifyDocument(documentUrl, documentType);

    // Store verification result
    const { error: updateError } = await supabase
      .from("document_verifications")
      .insert({
        member_id: memberId,
        document_type: documentType,
        is_valid: result.isValid,
        confidence: result.confidence,
        feedback: result.feedback,
        detected_text: result.detectedText,
      });

    if (updateError) throw updateError;

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
