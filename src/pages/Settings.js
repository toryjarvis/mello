import React from "react";
import "./Settings.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Settings = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <div className={`settings-container ${currentTheme}`}>
      <h1>Settings</h1>
      <form className="settings-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
