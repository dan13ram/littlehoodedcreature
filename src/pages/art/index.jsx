import React from "react";
import { graphql } from 'gatsby';
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import SEO from "../../components/SEO";
import "../../scss/artPage.scss";

const ArtPage = ({
    data: {
        site: {
            siteMetadata: { title }
        }
    }
}) => (
    <Layout>
        <SEO title={`Art | ${title}`} />
        <div className="artPage">
            <div className="intro">Check what Vitalik has written</div>
            <div className="content">
                <BlogRoll />
            </div>
        </div>
    </Layout>
);
export default ArtPage;

export const artPageQuery = graphql`
    query ArtQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
