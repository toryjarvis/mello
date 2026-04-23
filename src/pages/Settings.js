import React from "react";
import "./Settings.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import api from "../config/apiConfig";
import { TextField, Button } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const Settings = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
    };

    try {
      await api.put(`/users/${user.id}`, userData);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const passwordData = {
      password: formData.get("password"),
    };

    try {
      await api.put(`/users/${user.id}/password`, passwordData);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className={`settings-container ${currentTheme}`}>
      <h1>Settings</h1>
      <form className="settings-form" onSubmit={handleSaveProfile}>
        <div>
          <label htmlFor="username">Username:</label>
          <TextField type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <TextField type="email" id="email" name="email" />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
      <form className="settings-form" onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="password">New Password:</label>
          <TextField type="password" id="password" name="password" />
        </div>
        <Button type="submit">Change Password</Button>
      </form>
    </div>
  );
};

export default Settings;
