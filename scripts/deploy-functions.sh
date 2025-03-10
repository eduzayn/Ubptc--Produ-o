#!/bin/bash

# Script para implantar todas as Edge Functions do Supabase

# Configurações
PROJECT_REF="ijgsotlpwhprqbilgqlz"

# Implanta a função hello-world
echo "Implantando hello-world..."
supabase functions deploy hello-world --project-ref $PROJECT_REF --no-verify-jwt

# Implanta a função process-payment
echo "Implantando process-payment..."
supabase functions deploy process-payment --project-ref $PROJECT_REF --no-verify-jwt

# Implanta a função asaas-proxy
echo "Implantando asaas-proxy..."
supabase functions deploy asaas-proxy --project-ref $PROJECT_REF --no-verify-jwt

# Implanta a função asaas-webhook
echo "Implantando asaas-webhook..."
supabase functions deploy asaas-webhook --project-ref $PROJECT_REF --no-verify-jwt

# Implanta a função verify-document
echo "Implantando verify-document..."
supabase functions deploy verify-document --project-ref $PROJECT_REF --no-verify-jwt

echo "Todas as funções foram implantadas com sucesso!"
