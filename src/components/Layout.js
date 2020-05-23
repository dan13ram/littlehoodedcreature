import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../scss/all.scss";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const Layout = ({ children }) => {
    const { title, description } = useSiteMetadata();
    return (
        <div className="layout">
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
                {/* <link rel="manifest" href="/site.webmanifest" /> */}
                <link
                    rel="apple-touch-icon"
                    // sizes="180x180"
                    href={`${withPrefix("/")}img/om-logo.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix("/")}img/om-logo.png`}
                    // sizes="32x32"
                />
                {/* <link */}
                {/*     rel="icon" */}
                {/*     type="image/png" */}
                {/*     href={`${withPrefix("/")}img/favicon-16x16.png`} */}
                {/*     sizes="16x16" */}
                {/* /> */}
                <link
                    rel="mask-icon"
                    href={`${withPrefix("/")}img/om-logo.png`}
                    // color="#ff4400"
                />
                <meta name="theme-color" content="#fff" />
                <meta name="msapplication-TileColor" content="#fff" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="/" />
                <meta
                    property="og:image"
                    content={`${withPrefix("/")}img/om-logo.png`}
                />
            </Helmet>
            <Navbar title={title} />
            <main className="main">{children}</main>
            <Footer title={title} />
        </div>
    );
};

export default Layout;
