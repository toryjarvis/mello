import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";

import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <FeedbackProvider>
        <AuthProvider>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </AuthProvider>
      </FeedbackProvider>
    </Router>
  </React.StrictMode>,
);
