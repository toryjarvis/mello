import React, { createContext, useContext, useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const themes = useMemo(
    () => ({
      light: createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#2563eb",
            contrastText: "#f8fafc",
          },
          secondary: {
            main: "#64748b",
            contrastText: "#f8fafc",
          },
          error: { main: "#e11d48" },
          background: {
            default: "#f4f5f7",
            paper: "#f8faff",
          },
          text: {
            primary: "#23272f",
            secondary: "#4b5563",
          },
        },
      }),

      dark: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#591f90",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#475569",
            contrastText: "#f1f5f9",
          },
          error: { main: "#f43f5e" },
          background: {
            default: "#0f1117",
            paper: "#1c1f26",
          },
          text: {
            primary: "#e8eaf0",
            secondary: "#8b95a1",
          },
        },
      }),

      ember: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#e85d04",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#6b3a2a",
            contrastText: "#f5e6d8",
          },
          error: { main: "#ef4444" },
          background: {
            default: "#1a0f0a",
            paper: "#261510",
          },
          text: {
            primary: "#f5e6d8",
            secondary: "#c4a882",
          },
        },
      }),

      dusk: createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#7c3aed",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#8b5cf6",
            contrastText: "#ffffff",
          },
          error: { main: "#e11d48" },
          background: {
            default: "#f5f3ff",
            paper: "#faf8ff",
          },
          text: {
            primary: "#1e1635",
            secondary: "#6b5b9a",
          },
        },
      }),

      forest: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#16a34a",
            contrastText: "#fff5f5",
          },
          secondary: {
            main: "#2d5a38",
            contrastText: "#e0ede3",
          },
          error: { main: "#f43f5e" },
          background: {
            default: "#0c1a10",
            paper: "#152319",
          },
          text: {
            primary: "#e0ede3",
            secondary: "#7aaa80",
          },
        },
      }),

      midnight: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#111f7b",
            contrastText: "#faffff",
          },
          secondary: {
            main: "#1e4d6e",
            contrastText: "#dde8f5",
          },
          error: { main: "#f43f5e" },
          background: {
            default: "#0d1b2a",
            paper: "#172435",
          },
          text: {
            primary: "#dde8f5",
            secondary: "#6a9ab8",
          },
        },
      }),
    }),
    []
  );

  const theme = themes[currentTheme];

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem("theme", themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      <MuiThemeProvider theme={theme}>
        <div>{children}</div>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext };

export { ThemeProvider as ThemeContextProvider };
