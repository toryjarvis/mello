import React from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App';
import './AppWithNavigate.css';

const AppWithNavigate = (props) => {
  const navigate = useNavigate();
  return <App {...props} navigate={navigate} />;
};

export default AppWithNavigate;