import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

import "./styles/global.css";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
