import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in delay-300">
            <p className="footer-tagline">
                Trusted peptides • Transparent pricing • Growing community
            </p>
            <p className="footer-copyright">
                © {new Date().getFullYear()} Peptide by MJ
            </p>
        </footer>
    );
};

export default Footer;
