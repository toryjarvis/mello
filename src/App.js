import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import spinningm from './spinningm.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="App-header">
          <h1>Welcome to Mello</h1>
        </header>

        {/* Main Content */}
        <div className="App-main">
          <img src={spinningm} className="App-logo" alt="logo" />
          <p>Manage your projects with ease.</p>
          <Link to="/landing" className="App-link">
            Hello Mello
          </Link>
        </div>

        {/* Footer */}
        <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} Mello. All Rights Reserved.</p>
        </footer>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
}

// Placeholder for Landing Component
function Landing() {
  return (
    <div>
      <h2>This is the Landing Page!</h2>
      <p>Content for the landing page goes here.</p>
    </div>
  );
}

export default App;
