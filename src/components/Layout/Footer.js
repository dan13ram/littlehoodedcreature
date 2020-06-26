import React from 'react';
import { Link } from 'gatsby';

const Footer = ({ title, showTop, setRef }) => {
    return (
        <footer className="footer" ref={setRef}>
            {showTop && (
                <a href="#top" className="top">
                    {'\u25b2'}
                </a>
            )}
            <div className="copyright">
                {' © '}
                <Link to={`/`}>{title}</Link>
                {' ' + new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
