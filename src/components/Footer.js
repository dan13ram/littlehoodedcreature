import React from "react";
import { Link } from "gatsby";

const Footer = ({ title }) => {
    return (
        <footer className="footer">
            Copyright © {new Date().getFullYear()}{" "}
            <Link to={`/`}>{title}</Link>
        </footer>
    );
};

export default Footer;
