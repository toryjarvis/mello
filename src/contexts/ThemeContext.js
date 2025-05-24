import React, { createContext, useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const themes = useMemo(() => ({
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
  }), []);

  const theme = themes[currentTheme];

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
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
