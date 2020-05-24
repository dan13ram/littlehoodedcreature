import React, { useState } from "react";
import { Link } from "gatsby";
import logo from "../../static/img/om-logo.png";
import { applyTheme } from "../utils/Theme";
/* eslint-disable */

const Navbar = ({ title }) => {
    const [open, toggleOpen] = useState(false);
    const [currentTheme, setTheme] = React.useState("light");
    const [theme, toggleTheme] = React.useState(false);
    const changeTheme = () => {
        toggleTheme(theme => !theme);
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        applyTheme(nextTheme);
    };

    return (
        <nav className={open ? "navBar open" : "navBar"}>
            <Link
                to="/"
                className="navLogo"
                title={title}
                onClick={() => {
                    toggleOpen(open => false);
                }}
            >
                <img src={logo} alt="" className="logoImg" /> {title}
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
                    toggleOpen(open => false);
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
                    toggleOpen(open => !open);
                }}
            >
                <div></div>
            </div>
        </nav>
    );
};

export default Navbar;
