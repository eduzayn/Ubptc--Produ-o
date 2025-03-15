import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ijgsotlpwhprqbilgqlz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZ3NvdGxwd2hwcnFiaWxncWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MzE5MTYsImV4cCI6MjA1NDEwNzkxNn0.EHTB-fG6-2TN_MG9MQq4jCm6NSO0hDhGIApigKGBerI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
