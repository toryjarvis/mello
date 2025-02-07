import React from 'react';
import './Button.css';

const Button = ({ text, onClick, type = "primary", disabled = false }) => {
  return (
    <button className={`btn btn-${type}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
