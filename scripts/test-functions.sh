#!/bin/bash

# Script para testar as Edge Functions do Supabase

# Configurações
PROJECT_REF="ijgsotlpwhprqbilgqlz"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZ3NvdGxwd2hwcnFiaWxncWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MzE5MTYsImV4cCI6MjA1NDEwNzkxNn0.EHTB-fG6-2TN_MG9MQq4jCm6NSO0hDhGIApigKGBerI"

# Testa a função hello-world
echo "Testando hello-world..."
curl -L -X POST "https://$PROJECT_REF.supabase.co/functions/v1/hello-world" \
  -H "Authorization: Bearer $ANON_KEY" \
  --data '{"name":"Functions"}'
echo ""

# Testa a função process-payment
echo "Testando process-payment..."
curl -L -X POST "https://$PROJECT_REF.supabase.co/functions/v1/process-payment" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  --data '{
    "customer_name": "João da Silva",
    "customer_cpf": "12345678900",
    "customer_email": "joao@example.com",
    "customer_phone": "11999999999",
    "amount": 299.9
  }'
echo ""

# Testa a função asaas-proxy
echo "Testando asaas-proxy..."
curl -L -X POST "https://$PROJECT_REF.supabase.co/functions/v1/asaas-proxy" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  --data '{
    "endpoint": "customers",
    "method": "GET"
  }'
echo ""

# Testa a função verify-document
echo "Testando verify-document..."
curl -L -X POST "https://$PROJECT_REF.supabase.co/functions/v1/verify-document" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  --data '{
    "documentUrl": "https://example.com/document.jpg",
    "documentType": "id_document",
    "memberId": "123"
  }'
echo ""

echo "Todos os testes foram concluídos!"
