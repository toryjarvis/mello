import React, { useState, useContext } from "react";
import { register, login } from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./AuthForm.css";

const AuthForm = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setError("");
    setSuccess("");
  };

  const { login: authLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isSignUp) {
        await register(formData.username, formData.email, formData.password);
        setSuccess("Sign-up successful! You can now log in.");
      } else {
        const response = await login(formData.email, formData.password);
        authLogin(response.token);
        setSuccess("Login successful!");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className={`Form-container ${currentTheme}`}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      {error && <p className="Error-message">{error}</p>}
      {success && <p className="Success-message">{success}</p>}

      <form className="Form-wrapper" onSubmit={handleSubmit}>
        {isSignUp && (
          <TextField
            id="username"
            label="Username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            variant="outlined"
          />
        )}

        <TextField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          size="small"
          variant="outlined"
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          size="small"
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <p className="Toggle-text" onClick={toggleForm}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default AuthForm;
