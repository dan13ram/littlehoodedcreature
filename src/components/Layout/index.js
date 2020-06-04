import React from 'react';
import SEO from '../SEO';
import Footer from './Footer';
import Navbar from './Navbar';
import '../../scss/all.scss';
import '../../scss/layout.scss';
import useSiteMetadata from '../SiteMetadata';

const Layout = ({ children }) => {
    const { title, social } = useSiteMetadata();
    return (
        <div className="layout">
            <SEO title={title} titleTemplate={title} />
            <Navbar title={title} />
            <main className="main">
                {children}
                <Footer title={title} social={social} />
            </main>
        </div>
    );
};

export default Layout;
