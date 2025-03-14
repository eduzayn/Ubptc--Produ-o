import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./lib/auth";

// Import the dev tools
import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo Devtools
if (import.meta.env.VITE_TEMPO === "true") {
  TempoDevtools.init();
}

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
