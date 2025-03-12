import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Adicionar plugins condicionais
const conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [...conditionalPlugins],
    }),
    tempo(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  define: {
    __WS_TOKEN__: JSON.stringify("tempo-ws-token"),
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
