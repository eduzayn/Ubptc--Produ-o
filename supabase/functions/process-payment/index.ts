import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../shared/cors.ts";

const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY")!;
const ASAAS_API_URL = "https://sandbox.asaas.com/api/v3";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      customer_name,
      customer_cpf,
      customer_email,
      customer_phone,
      amount,
    } = await req.json();

    const response = await fetch(`${ASAAS_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: ASAAS_API_KEY,
      },
      body: JSON.stringify({
        name: customer_name,
        cpfCnpj: customer_cpf,
        email: customer_email,
        phone: customer_phone,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
