import React, { useState } from 'react';
import './SignInSignUpForm.css'; // Optional: Create a separate CSS file for form styles

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="Form-container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form>
        {isSignUp && (
          <div className="Form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" placeholder="Enter your name" />
          </div>
        )}
        <div className="Form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="Form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button className="Toggle-button" onClick={toggleForm}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default SignInSignUpForm;
