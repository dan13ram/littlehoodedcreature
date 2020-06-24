import React from 'react';
import { Link } from 'gatsby';

const Footer = ({ title }) => {
    return (
        <footer className="footer">
            <a href="#top" className="top">
                {'\u25b2'}
            </a>
            <div className="copyright">
                {' © '}
                <Link to={`/`}>{title}</Link>
                {' ' + new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
