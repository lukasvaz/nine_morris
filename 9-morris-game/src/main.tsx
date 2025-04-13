import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { GameProvider } from "./context/GameContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
    <GameProvider>
      <ThemeProvider>
          <App />
      </ThemeProvider>
    </GameProvider>
        </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
