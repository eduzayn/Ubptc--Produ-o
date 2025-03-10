import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name } = await req.json();

  return new Response(JSON.stringify({ message: `Hello, World!` }), {
    headers: { "Content-Type": "application/json" },
  });
});
