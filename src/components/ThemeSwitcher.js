import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Select, MenuItem } from "@mui/material";

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme } = useContext(ThemeContext);

  return (
    <Select
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
      <MenuItem value="light" className="switcher-text">
        Light
      </MenuItem>
      <MenuItem value="dark" className="switcher-text">
        Dark
      </MenuItem>
      <MenuItem value="ember" className="switcher-text">
        Ember
      </MenuItem>
      <MenuItem value="dusk" className="switcher-text">
        Dusk
      </MenuItem>
      <MenuItem value="forest" className="switcher-text">
        Forest
      </MenuItem>
      <MenuItem value="midnight" className="switcher-text">
        Midnight
      </MenuItem>
    </Select>
  );
};

export default ThemeSwitcher;
