#!/bin/bash

# Script para executar as Edge Functions localmente

# Executa a função hello-world localmente
echo "Executando hello-world localmente..."
supabase functions serve hello-world --no-verify-jwt

# Para executar outras funções, use os comandos abaixo:
# supabase functions serve process-payment --no-verify-jwt
# supabase functions serve asaas-proxy --no-verify-jwt
# supabase functions serve asaas-webhook --no-verify-jwt
# supabase functions serve verify-document --no-verify-jwt
