import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import ArtRoll from "../../components/ArtRoll";
import SEO from "../../components/SEO";
import "../../scss/artPage.scss";

const ArtPage = ({ data }) => (
    <Layout>
        <SEO title={`Art`} />
        <div className="artPage">
            <div className="intro">Check what Vitalik has written</div>
            <div className="content">
                <ArtRoll />
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
