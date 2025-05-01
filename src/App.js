import React, { useContext } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Button from './components/Utils/Button';

import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import Dashboard from "./pages/Dashboard";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import BoardDetail from "./pages/BoardDetail";
import Settings from "./pages/Settings";

import Button from "@mui/material/Button";

import spinningm from "./spinningm.svg";

import "./App.css";

import ThemeSwitcher from "./components/ThemeSwitcher";
import { ThemeContext } from "./contexts/ThemeContext";

const App = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { currentTheme } = useContext(ThemeContext);

  if (loading) return <p>Loading...</p>;

  const handleHelloMelloClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`App ${currentTheme}`}>
      <Header />

      {/* Theme Switcher */}
      <div
        className="theme-switcher-container"
        style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}
      >
        <ThemeSwitcher />
      </div>

      <div className="App-main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <img
                  src={spinningm}
                  className="App-logo"
                  alt="logo"
                  style={{ cursor: "pointer" }}
                  onClick={handleHelloMelloClick}
                />
                <p className="logline">Manage your projects with ease.</p>
                <Button
                  text="Hello Mello"
                  variant="contained"
                  className="App-link"
                  onClick={handleHelloMelloClick}
                >
                  Hello Mello
                </Button>
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginSignUpPage /> : <Navigate to="/dashboard" />}
          />
          <Route path="/boards/:boardId" element={<BoardDetail />} />
          <Route
            path="/settings"
            element={!user ? <LoginSignUpPage /> : <Settings />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
