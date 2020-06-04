import React from 'react';
import { graphql } from 'gatsby';
import BlogRoll from '../../components/BlogRoll';
import SEO from '../../components/SEO';
import '../../scss/blogPage.scss';

const BlogPage = ({ data }) => (
    <div className="blogPage">
        <SEO title={`Blog`} />
        <div className="intro">Check what Vitalik has written</div>
        <div className="content">
            <BlogRoll />
        </div>
    </div>
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
