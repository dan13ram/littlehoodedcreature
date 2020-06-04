import React from 'react';
import { Link } from 'gatsby';

const Footer = ({ title }) => {
    return (
        <footer className="footer">
            © <Link to={`/`}>{title}</Link> {new Date().getFullYear()}. All
            rights reserved
        </footer>
    );
};

export default Footer;
