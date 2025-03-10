import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://ijgsotlpwhprqbilgqlz.supabase.co";
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZ3NvdGxwd2hwcnFiaWxncWx6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODUzMTkxNiwiZXhwIjoyMDU0MTA3OTE2fQ.ksSWVgh-pE3pwSZ7vwfUCo5MkQ-Pjk-ONLCcyf2kFNo";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    const { event, payment } = await req.json();

    const { error } = await supabase.rpc("update_payment_status", {
      asaas_id: payment.id,
      event: event,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
