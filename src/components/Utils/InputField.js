import React from 'react';
import './InputField.css';

const InputField = ({ id, label, type = "text", placeholder, value, onChange, error }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label" htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={`input-field ${error ? "input-error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default InputField;
