import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./lib/auth";

// Definir basename para o router
const basename = import.meta.env.BASE_URL || "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// Initialize Tempo after render
if (import.meta.env.DEV && import.meta.env.VITE_TEMPO === "true") {
  // Use a simple timeout to ensure this runs after render
  setTimeout(() => {
    import("tempo-devtools")
      .then(({ TempoDevtools }) => {
        TempoDevtools.init();
      })
      .catch((err) => {
        console.error("Failed to load Tempo Devtools:", err);
      });
  }, 0);
}
