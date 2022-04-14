import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='mt-5'>
            <p><small>Copyright  {new Date().getFullYear()}</small></p>
        </footer>
    );
};

export default Footer;