#!/bin/bash

# Instalar TypeScript e Vite localmente
npm install --no-save typescript vite

# Executar o build
./node_modules/.bin/tsc --noEmitOnError false
./node_modules/.bin/vite build