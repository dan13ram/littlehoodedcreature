import React, { useState } from 'react';
import { Link } from 'gatsby';
import { applyTheme } from '../../utils/Theme';
import useSiteMetadata from '../SiteMetadata';
import {ReactComponent as Logo} from '../../svg/logo.svg';

import { Icon } from '@iconify/react';
import instagramIcon from '@iconify/icons-ant-design/instagram-outlined';
import vimeoIcon from '@iconify/icons-la/vimeo';
import linkedinIcon from '@iconify/icons-la/linkedin-in';


import '../../scss/navBar.scss';
/* eslint-disable */

const Navbar = ({ title }) => {
    const { author, social } = useSiteMetadata();
    const [open, toggleOpen] = useState(false);
    const [currentTheme, setTheme] = React.useState('light');
    const [theme, toggleTheme] = React.useState(false);
    const changeTheme = () => {
        toggleTheme(theme => !theme);
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
                    toggleOpen(open => false);
                }}
            >
                <Logo id="logoSvg"/>
            </Link>
            <div
                className="navMenu"
                onClick={() => {
                    toggleOpen(open => false);
                }}
            >
                <Link className="navItem" to={`/work`}>
                    work
                </Link>
                <Link className="navItem" to={`/blog`}>
                    blog
                </Link>
                <Link className="navItem" to={`/about`}>
                    about
                </Link>
            </div>
            <div className="switchContainer">
                <label className="switch">
                    <input
                        type="checkbox"
                        defaultChecked={theme}
                        onChange={changeTheme}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="social">
                <a
                    href={`https://vimeo.com/${social.vimeo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className="icon" icon={vimeoIcon} />
                </a>
                <a
                    href={`https://instagram.com/${social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className="icon" icon={instagramIcon} />
                </a>
                <a
                    href={`https://linkedin.com/in/${social.linkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className="icon" icon={linkedinIcon} />
                </a>
            </div>
            <div
                className="navToggle"
                onClick={() => {
                    toggleOpen(open => !open);
                }}
            >
                <div></div>
            </div>
        </nav>
    );
};

export default Navbar;
