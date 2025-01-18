import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="App-header">
      <div className="Header-container">
        <button className="Header-button" onClick={toggleMenu}>m.</button>
        <nav className={`Header-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="Header-list">
            <li><a href="/" className="Header-link">Home</a></li>
            <li><a href="/about" className="Header-link">About Mello</a></li>
            <li><a href="/contact" className="Header-link">Contact Us</a></li>
            <li><a href="/faq" className="Header-link">FAQ</a></li>
          </ul>
          <button className="Close-button" onClick={toggleMenu}>Close</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

