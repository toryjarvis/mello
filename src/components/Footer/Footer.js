import React, { useContext } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

const Footer = () => {
    const { currentTheme } = useContext(ThemeContext);

    return (
        <footer className={`App-footer ${currentTheme}`}>
            <p>&copy; {new Date().getFullYear()} Mello. All Rights Reserved.</p>
            <Link to='/privacy' className='privacy-footer-link'>Privacy</Link>
        </footer>
    );
};

export default Footer;