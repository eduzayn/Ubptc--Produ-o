#!/bin/bash

# Script para configurar as variáveis de ambiente (secrets) para as Edge Functions

# Configurações
PROJECT_REF="ijgsotlpwhprqbilgqlz"

# Configura a chave da API Asaas
echo "Configurando ASAAS_API_KEY..."
supabase secrets set ASAAS_API_KEY="$aact_MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjgzNzVkYTRhLWQ2NzMtNGQyMC1iYTUwLWY5MGJkOTAyZjNhODo6JGFhY2hfNTYzZjY0ODItMThmMy00Yzc1LTgxMTQtOGIyZjEzMDcyMTBm" --project-ref $PROJECT_REF

# Configura a URL da API Asaas
echo "Configurando ASAAS_API_URL..."
supabase secrets set ASAAS_API_URL="https://sandbox.asaas.com/api/v3" --project-ref $PROJECT_REF

# Configura a URL do Supabase
echo "Configurando SUPABASE_URL..."
supabase secrets set SUPABASE_URL="https://ijgsotlpwhprqbilgqlz.supabase.co" --project-ref $PROJECT_REF

# Configura a chave de serviço do Supabase
echo "Configurando SUPABASE_SERVICE_KEY..."
supabase secrets set SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZ3NvdGxwd2hwcnFiaWxncWx6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODUzMTkxNiwiZXhwIjoyMDU0MTA3OTE2fQ.ksSWVgh-pE3pwSZ7vwfUCo5MkQ-Pjk-ONLCcyf2kFNo" --project-ref $PROJECT_REF

# Configura a chave da API Google (para verificação de documentos)
echo "Configurando GOOGLE_API_KEY..."
supabase secrets set GOOGLE_API_KEY="SUA_CHAVE_API_GOOGLE" --project-ref $PROJECT_REF

echo "Todas as variáveis de ambiente foram configuradas com sucesso!"
