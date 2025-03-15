import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

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
