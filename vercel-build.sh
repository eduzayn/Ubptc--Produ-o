#!/bin/bash

# Instalar TypeScript e Vite localmente no projeto
npm install --no-save typescript vite @vitejs/plugin-react-swc

# Executar o build usando os binários locais
./node_modules/.bin/tsc --noEmitOnError false
./node_modules/.bin/vite build