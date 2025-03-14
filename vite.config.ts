import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";
import { tempo } from "tempo-devtools/dist/vite";

dotenv.config();

// Add this block of code for Tempo
const conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [...conditionalPlugins], // Add the conditional plugin
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
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development",
    ),
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
