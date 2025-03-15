/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASAAS_API_KEY: string;
  readonly VITE_ASAAS_API_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_SERVICE_KEY: string;
  readonly BASE_URL: string;
  readonly VITE_DEV_ADMIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
