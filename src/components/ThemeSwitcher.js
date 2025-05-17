import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Select, MenuItem } from "@mui/material";
import "./../components/Header/Header.css";

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme } = useContext(ThemeContext);

  return (
    <Select
      // size="small"
      value={currentTheme}
      onChange={(e) => switchTheme(e.target.value)}
      variant="standard"
      style={{
        margin: "10px",
        color: "inherit",
        padding: "5px",
        border: "none",
        backgroundColor: "inherit",
      }}
    >
      <MenuItem value="light" className="switcher-text">
        Light
      </MenuItem>
      <MenuItem value="dark" className="switcher-text">
        Dark
      </MenuItem>
      <MenuItem value="ember" className="switcher-text">
        Ember
      </MenuItem>
    </Select>
  );
};

export default ThemeSwitcher;
