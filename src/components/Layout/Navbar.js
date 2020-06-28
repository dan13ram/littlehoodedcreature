import React, { useState, useEffect } from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { applyTheme } from '../../utils/Theme';
import useSiteMetadata from '../SiteMetadata';
import WorkList from '../WorkList';
import { ReactComponent as Logo } from '../../svg/logo.svg';
import { ReactComponent as Work } from '../../svg/work.svg';
import { ReactComponent as Blog } from '../../svg/blog.svg';
import { ReactComponent as About } from '../../svg/about.svg';

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
    const isActiveNavItem = ({ isCurrent }) => {
        return isCurrent
            ? { className: 'navItem active' }
            : { className: 'navItem' };
    };
    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            toggleTheme(theme => currentTheme !== 'light');
            setTheme(currentTheme);
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        }
    }, []);
    const changeTheme = () => {
        toggleTheme(theme => !theme);
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        applyTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    };

    return (
        <nav className={open ? 'navBar open' : 'navBar'}>
            <AniLink
                fade
                to="/work"
                className="navLogo"
                title={title}
                onClick={() => {
                    toggleOpen(open => false);
                }}
            >
                <Logo id="logoSvg" />
            </AniLink>
            <div
                className="navMenu"
                onClick={() => {
                    toggleOpen(open => false);
                }}
            >
                <AniLink
                    fade
                    getProps={isActiveNavItem}
                    id="workSvg"
                    to={`/work`}
                >
                    <Work className="navSvg" />
                </AniLink>
                <WorkList />
                <AniLink
                    fade
                    getProps={isActiveNavItem}
                    id="blogSvg"
                    to={`/blog`}
                >
                    <Blog className="navSvg" />
                </AniLink>
                <AniLink
                    fade
                    getProps={isActiveNavItem}
                    id="aboutSvg"
                    to={`/about`}
                >
                    <About className="navSvg" />
                </AniLink>
            </div>
            <div className="switchContainer">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={theme}
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
