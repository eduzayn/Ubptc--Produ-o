import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./lib/auth";

// Definir basename para o router
const basename = import.meta.env.BASE_URL || "/";

// Import and initialize Tempo Devtools after DOM is ready
if (import.meta.env.VITE_TEMPO === "true") {
  // Use dynamic import to avoid issues with the plugin
  import("tempo-devtools/dist/index.js")
    .then(({ TempoDevtools }) => {
      TempoDevtools.init();
    })
    .catch((err) => {
      console.error("Failed to initialize Tempo:", err);
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
