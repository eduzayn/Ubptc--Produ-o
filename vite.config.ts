import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
// Adicionar plugins condicionais
const conditionalPlugins: [string, Record<string, any>][] = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/dist/babel-plugin", {}]);
}

=======
>>>>>>> origin/main
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
<<<<<<< HEAD
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  define: {
    __WS_TOKEN__: JSON.stringify("tempo-ws-token"),
=======
>>>>>>> origin/main
  },
  build: {
    chunkSizeWarningLimit: 1000, // Evita avisos de chunks grandes
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separa dependências externas em um chunk específico
          }
        },
      },
    },
  },
});
