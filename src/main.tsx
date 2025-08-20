import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { validateEnvironment, config } from "./config/env";

// Validate environment variables on app startup
validateEnvironment();

// Log environment info in development
if (config.enableDebug) {
  console.log('🎮 GameList Frontend');
  console.log('📍 Environment:', config.mode);
  console.log('🔗 API URL:', config.apiUrl);
  console.log('📦 Version:', config.appVersion);
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
