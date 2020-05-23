import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../scss/all.scss";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { Icon } from "@iconify/react";
import instagramOutlined from "@iconify/icons-ant-design/instagram-outlined";
import twitterOutlined from "@iconify/icons-ant-design/twitter-outlined";
import linkedinOutlined from "@iconify/icons-ant-design/linkedin-outlined";
import githubOutlined from "@iconify/icons-ant-design/github-outlined";

const Layout = ({ children }) => {
    const { title, description, social } = useSiteMetadata();
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
            <main className="main">
                {/* children */}
                <div className="construction">
                    <div className="banner">Website Under Construction</div>
                    <div className="intro">
                        <p>You can find me at:</p>
                        <a
                            href={`https://github.com/${social.github}`}
                            target="_blank"
                            rel="noopener"
                        >
                            <Icon className="icon" icon={githubOutlined} />{" "}
                            Github
                        </a>
                        <a
                            href={`https://instagram.com/${social.instagram}`}
                            target="_blank"
                            rel="noopener"
                        >
                            <Icon className="icon" icon={instagramOutlined} />{" "}
                            Instagram
                        </a>
                        <a
                            href={`https://twitter.com/${social.twitter}`}
                            target="_blank"
                            rel="noopener"
                        >
                            <Icon className="icon" icon={twitterOutlined} />{" "}
                            Twitter
                        </a>
                        <a
                            href={`https://linkedin.com/in/${social.linkedIn}`}
                            target="_blank"
                            rel="noopener"
                        >
                            <Icon className="icon" icon={linkedinOutlined} />{" "}
                            LinkedIn
                        </a>
                    </div>
                </div>
            </main>
            <Footer title={title} />
        </div>
    );
};

export default Layout;
