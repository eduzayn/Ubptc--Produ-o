#!/bin/bash

# Instalar TypeScript e Vite globalmente
npm install -g typescript vite

# Executar o build
npx tsc --noEmitOnError false
npx vite build