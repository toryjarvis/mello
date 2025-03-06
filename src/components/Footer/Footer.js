import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="App-footer">
            <p>&copy; {new Date().getFullYear()} Mello. All Rights Reserved.</p>
            <Link to="/privacy" className="privacy-footer-link">Privacy</Link> 
        </footer>
    );
};

export default Footer;