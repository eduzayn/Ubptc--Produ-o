#!/bin/bash

echo "Current directory: $(pwd)"
echo "Listing files: $(ls -la)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Usar caminhos completos para os binários
export PATH="$PATH:./node_modules/.bin"
npx tsc --noEmitOnError false
npx vite build