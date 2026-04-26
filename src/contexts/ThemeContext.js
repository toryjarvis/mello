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
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#e11d48",
            contrastText: "#ffffff",
          },
          background: {
            default: "#f8fafc",
            paper: "#ffffff",
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
            main: "#7e0078",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#b22222",
            contrastText: "#ffffff",
          },
          background: {
            default: "#181a1b",
            paper: "#23272f",
          },
          text: {
            primary: "#f3f4f6",
            secondary: "#b0b8c1",
          },
        },
      }),

      ember: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#ff6f00",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#d84315",
            contrastText: "#ffffff",
          },
          background: {
            default: "#3e2723",
            paper: "#4e342e",
          },
          text: {
            primary: "#ffffff",
            secondary: "#ffccbc",
          },
        },
      }),
      dusk: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#4a5568",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#718096",
            contrastText: "#ffffff",
          },
          background: {
            default: "#2d3748",
            paper: "#4a5568",
          },
          text: {
            primary: "#e2e8f0",
            secondary: "#a0aec0",
          },
        },
      }),
      forest: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#2f855a",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#38a169",
            contrastText: "#ffffff",
          },
          background: {
            default: "#2d3748",
            paper: "#4a5568",
          },
          text: {
            primary: "#e2e8f0",
            secondary: "#a0aec0",
          },
        },
      }),
      midnight: createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#1a202c",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#2d3748",
            contrastText: "#ffffff",
          },
          background: {
            default: "#000000",
            paper: "#1a202c",
          },
          text: {
            primary: "#e2e8f0",
            secondary: "#a0aec0",
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
        <div className={`App ${currentTheme}`}>{children}</div>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext };

export { ThemeProvider as ThemeContextProvider };
