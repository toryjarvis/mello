import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='App-header'>
      <div className='Header-container'>
        <Link to='/' className='Header-logo'>m.</Link>

        <button 
          className={`Menu-toggle ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu} 
          aria-label='Toggle menu'
        >
          {isOpen ? '×' : '☰'}
        </button>

        <nav className={`Header-nav ${isOpen ? 'open' : ''}`}>
          <ul className='Header-list'>
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