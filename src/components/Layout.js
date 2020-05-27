import React from "react";
import SEO from "./SEO";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../scss/all.scss";
import useSiteMetadata from "./SiteMetadata";

const Layout = ({ children }) => {
    const { title, social } = useSiteMetadata();
    return (
        <div className="layout">
            <SEO />
            <Navbar title={title} />
            <main className="main">{ children }</main>
            <Footer title={title} social={social}/>
        </div>
    );
};

export default Layout;
