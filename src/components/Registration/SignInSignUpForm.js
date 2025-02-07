import React, { useState } from 'react';
import Button from '../Utils/Button';
import InputField from '../Utils/InputField';
import './SignInSignUpForm.css';

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (isSignUp && formData.name.trim() === '') {
      setError('Full Name is required for sign up.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      if (isSignUp) {
        console.log('Sign Up Data:', formData);
        setSuccess('Sign-up successful! You can now log in.');
      } else {
        console.log('Sign In Data:', { email: formData.email, password: formData.password });
        setSuccess('Login successful!');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="Form-container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      {error && <p className="Error-message">{error}</p>}
      {success && <p className="Success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <InputField
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

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
          text={isSignUp ? 'Sign Up' : 'Sign In'}
          onClick={handleSubmit}
          className="Form-button"
        />

      </form>

      <p className="Toggle-text" onClick={toggleForm}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </p>

    </div>
  );
};

export default SignInSignUpForm;
