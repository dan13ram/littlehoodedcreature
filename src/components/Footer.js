import React from 'react';
import { Link } from 'gatsby';

const Footer = ({ title, showTop, setRef }) => {
    const scrollToTop = () => {
        window.setTimeout(() => {
            document
                .querySelector('#top')
                .scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };
    return (
        <footer className="footer" ref={setRef}>
            {showTop && (
                <div className="topContainer">
                    <span className="top" onClick={scrollToTop}>
                        {'\u25b2'}
                    </span>
                </div>
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
