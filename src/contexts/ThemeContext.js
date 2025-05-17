import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

const themes = {
  // Light mode
  light: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#ff4081" },
    },
  }),

  // Dark mode
  dark: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      secondary: { main: "#f48fb1" },
    },
  }),

  // "Ember" mode
  ember: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#ff6f00" },
      secondary: { main: "#d84315" },
      background: { default: "#3e2723", paper: "#4e342e" },
      text: { primary: "#ffffff", secondary: "#ffccbc" },
    },
  }),
};

export const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const switchTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  useEffect(() => {
    document.body.classList.remove("light", "dark", "ember");
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
