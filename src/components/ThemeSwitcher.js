import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Select, MenuItem } from "@mui/material";

const THEME_COLORS = {
  light: "#f8fafc",
  dark: "#0f1117",
  ember: "#dc2f02",
  dusk: "#8b5cf6",
  forest: "#16a34a",
  midnight: "#0b1451",
};

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme } = useContext(ThemeContext);

  return (
    <Select
      renderValue={(value) => (
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: THEME_COLORS[value],
          }}
        />
      )}
      size="small"
      value={currentTheme}
      onChange={(e) => switchTheme(e.target.value)}
      variant="standard"
      disableUnderline
      sx={{
        color: "inherit",
        "& .MuiSelect-icon": { color: "inherit" },
        ml: 1,
      }}
    >
      {Object.entries(THEME_COLORS).map(([theme, color]) => (
        <MenuItem key={theme} value={theme}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: color,
              marginRight: 8,
            }}
          />
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ThemeSwitcher;
