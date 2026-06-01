import React, { useEffect, useState } from "react";
import "./Settings.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import api from "../config/apiConfig";
import { TextField, Button } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useFeedback } from "../contexts/FeedbackContext";



const Settings = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { user, login } = useContext(AuthContext);
  const { showFeedback } = useFeedback();
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  useEffect(() => {
  if (!user || !user.id) return;
  api.get(`/users/${user.id}`)
  .then(response => {
    setUsername(response.data.username); 
    setEmail(response.data.email);
  });
}, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${user.id}`, { username, email });
      showFeedback("Profile updated successfully!", "success");
      login(response.data.token);
    } catch (error) {
      console.error("Error saving profile:", error);
      showFeedback("Failed to update profile.", "error");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user.id}/password`, { password });
      showFeedback("Password updated successfully!", "success");
      setPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      showFeedback("Failed to update password.", "error");
    }
  };

  return (
    <div className={`settings-container ${currentTheme}`}>
      <h1>Settings</h1>
      <form className="settings-form" onSubmit={handleSaveProfile}>
        <TextField
          label="Username"
          type="text"
          id="username"
          name="username"
          fullWidth
          size="small"
          variant="outlined"
          value = { username }
          onChange = {(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          id="email"
          name="email"
          fullWidth
          size="small"
          variant="outlined"
          value = { email }
          onChange = {(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Save Changes
        </Button>
      </form>
      <form className="settings-form" onSubmit={handleChangePassword}>
        <TextField
          label="New Password"
          type="password"
          id="password"
          name="password"
          fullWidth
          size="small"
          variant="outlined"
          value = { password }
          onChange = {(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default Settings;
