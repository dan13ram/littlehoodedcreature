import React from "react";
import { graphql } from 'gatsby';
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import SEO from "../../components/SEO";
import "../../scss/blogPage.scss";

const BlogPage = ({
    data
}) => (
    <Layout>
        <SEO title={`Blog`} />
        <div className="blogPage">
            <div className="intro">Check what Vitalik has written</div>
            <div className="content">
                <BlogRoll />
            </div>
        </div>
    </Layout>
);
export default BlogPage;

export const blogPageQuery = graphql`
    query BlogQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
