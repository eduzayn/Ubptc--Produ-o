#!/bin/bash

# Instalar TypeScript e Vite localmente no projeto
npm install --no-save typescript vite @vitejs/plugin-react-swc

# Verificar variáveis de ambiente
echo "Verificando variáveis de ambiente..."
echo "VITE_SUPABASE_URL: $VITE_SUPABASE_URL"
echo "VITE_SUPABASE_PROJECT_ID: $VITE_SUPABASE_PROJECT_ID"
echo "VITE_ASAAS_API_KEY: $VITE_ASAAS_API_KEY"
echo "VITE_BASE_PATH: $VITE_BASE_PATH"

# Executar o build usando os binários locais
./node_modules/.bin/tsc --noEmitOnError false
./node_modules/.bin/vite build