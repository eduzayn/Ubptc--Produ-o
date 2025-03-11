#!/bin/bash

# Build the project
npm run build

# Deploy to production server
echo "Deploying to production..."

# Usando Node.js para servir a aplicação
node server.js

echo "Deployment complete!"
