import React, { useState } from 'react';
import { Link } from 'gatsby';
import { applyTheme } from '../../utils/Theme';
import Logo from './Logo';
/* eslint-disable */

const Navbar = ({ title }) => {
    const [open, toggleOpen] = useState(false);
    const [currentTheme, setTheme] = React.useState('light');
    const [theme, toggleTheme] = React.useState(false);
    const changeTheme = () => {
        toggleTheme((theme) => !theme);
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        applyTheme(nextTheme);
    };

    return (
        <nav className={open ? 'navBar open' : 'navBar'}>
            <Link
                to="/"
                className="navLogo"
                title={title}
                onClick={() => {
                    toggleOpen((open) => false);
                }}
            >
                <Logo /> {title}
            </Link>
            <label className="switch">
                <input
                    type="checkbox"
                    defaultChecked={theme}
                    onChange={changeTheme}
                />
                <span className="slider round"></span>
            </label>
            <div
                className="navMenu"
                onClick={() => {
                    toggleOpen((open) => false);
                }}
            >
                <Link className="navItem" to={`/work`}>
                    work
                </Link>
                <Link className="navItem" to={`/art`}>
                    art
                </Link>
                <Link className="navItem" to={`/blog`}>
                    blog
                </Link>
                <Link className="navItem" to={`/about`}>
                    about
                </Link>
            </div>
            <div
                className="navToggle"
                onClick={() => {
                    toggleOpen((open) => !open);
                }}
            >
                <div></div>
            </div>
        </nav>
    );
};

export default Navbar;
