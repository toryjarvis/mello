import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Select, MenuItem } from "@mui/material";

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme } = useContext(ThemeContext);

  return (
    <Select
      value={currentTheme}
      onChange={(e) => switchTheme(e.target.value)}
      variant="outlined"
      style={{ margin: "10px", color: "inherit" }}
    >
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
      <MenuItem value="ember">Ember</MenuItem>
      <MenuItem value="cyberpunk">Cyberpunk</MenuItem>
    </Select>
  );
};

export default ThemeSwitcher;
