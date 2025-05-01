import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';
import { ThemeContext } from '../../contexts/ThemeContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    if (user) {
      // Redirect to dashboard if logged in      
      navigate('/dashboard');
    } else {
      // Redirect to home if not logged in    
      navigate('/');
    }
  };

  return (
    <header className={`App-header ${currentTheme}`}>
      <div className='Header-container'>
        {/* Logo Button - navigates conditionally */}
        <button className='Header-logo' onClick={handleLogoClick}>m.</button>

        {/* Menu Toggle Button */}
        <button
          className={`Menu-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isOpen ? '×' : '☰'}
        </button>

        {/* Navigation Menu */}
        <nav className={`Header-nav ${isOpen ? 'open' : ''}`}>
          <ul className='Header-list'>
            {/* TODO: Set Home link conditional redirect to dashboard based on user authentication */}
            <li><Link to='/' onClick={toggleMenu}>Home</Link></li>
            <li><Link to='/about' onClick={toggleMenu}>About Mello</Link></li>
            <li><Link to='/faq' onClick={toggleMenu}>FAQ</Link></li>
            <li><Link to='/contact' onClick={toggleMenu}>Contact</Link></li>
            {user && (
              <li><button onClick={logout} className='Logout-button'>Logout</button></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
