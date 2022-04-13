import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <p><small>Copyright {new Date().getFullYear()}</small></p>
        </footer>
    );
};

export default Footer;