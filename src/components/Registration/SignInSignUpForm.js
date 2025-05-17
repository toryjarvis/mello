import React, { useState } from "react";
import { signUpUser, signInUser } from "../../services/authService";
import Button from "../Utils/Button";
import InputField from "../Utils/InputField";
import "./SignInSignUpForm.css";

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // providers for other logins, might need to refactor to use Material SignIn
  // const providers = [
  //   { id: "github", name: "GitHub" },
  //   { id: "google", name: "Google" },
  // ];

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setError("Invalid credentials!");
    setSuccess("Success!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isSignUp) {
        await signUpUser(formData.email, formData.password);
        setSuccess("Sign-up successful! You can now log in.");
      } else {
        await signInUser(formData.email, formData.password);
        setSuccess("Login successful!");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="Form-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      {error && <p className="Error-message">{error}</p>}
      {success && <p className="Success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          type="primary"
          text={isSignUp ? "Sign Up" : "Sign In"}
          onClick={handleSubmit}
        />
      </form>

      <p className="Toggle-text" onClick={toggleForm}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default SignInSignUpForm;
