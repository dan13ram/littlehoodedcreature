import React from "react";
import { graphql } from 'gatsby';
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import SEO from "../../components/SEO";
import "../../scss/workPage.scss";

const WorkPage = ({
    data: {
        site: {
            siteMetadata: { title }
        }
    }
}) => (
    <Layout>
        <SEO title={`Work | ${title}`} />
        <div className="workPage">
            <div className="intro">Check what Vitalik has written</div>
            <div className="content">
                <BlogRoll />
            </div>
        </div>
    </Layout>
);
export default WorkPage;

export const workPageQuery = graphql`
    query WorkQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
