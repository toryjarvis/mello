import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import spinningm from './spinningm.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignInSignUpForm from './components/SignInSignUpForm';

function App() {

  const [showForm, setShowForm] = useState(false);

  // Show form, hide splash page content
  const handleHelloMelloClick = () => {
    setShowForm(true);
  };

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <Header />

        {/* Main */}
        <div className="App-main">
          {showForm ? (
            <SignInSignUpForm />
          ) : (
            <>
              <img src={spinningm} className="App-logo" alt="logo" onClick={handleHelloMelloClick} style={{ cursor: 'pointer' }} />
              <p>Manage your projects with ease.</p>
              <button className="App-link" onClick={handleHelloMelloClick}>Hello Mello</button>
            </>
          )}
        </div>

        {/* Footer */}
        <Footer/>
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
