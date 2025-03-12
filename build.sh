#!/bin/bash

# Instalar as dependências necessárias
npm install

# Pular a verificação de tipos e executar apenas o build do vite
node_modules/.bin/vite build