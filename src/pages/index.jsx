import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import BlogRoll from '../components/BlogRoll';
import ArtRoll from '../components/ArtRoll';
import WorkRoll from '../components/WorkRoll';
import '../scss/indexPage.scss';
import '../scss/page.scss';

export const IndexPageTemplate = ({
    // image,
    title,
    heading,
    mainpitch,
}) => (
    <div className="indexPage page">
        <section className="intro">
            <h1>{title}</h1>
            <h1>{heading}</h1>
            <h1>{mainpitch.title}</h1>
            <h3>{mainpitch.description}</h3>
        </section>
        <section className="content">
            <header className="title">
                <Link to="/work">{"all work projects \u2192"}</Link>
            </header>
            <WorkRoll />
        </section>
        <section className="content">
            <header className="title">
                <Link to="/art">{"all art collections \u2192"}</Link>
            </header>
            <ArtRoll />
        </section>
        <section className="content">
            <header className="title">
                <Link to="/blog">{"all blog posts \u2192"}</Link>
            </header>
            <BlogRoll />
        </section>
    </div>
);

IndexPageTemplate.propTypes = {
    // image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    mainpitch: PropTypes.object,
    description: PropTypes.string,
    intro: PropTypes.shape({
        blurbs: PropTypes.array,
    }),
};

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <IndexPageTemplate
            // image={frontmatter.image}
            title={frontmatter.title}
            heading={frontmatter.heading}
            mainpitch={frontmatter.mainpitch}
        />
    );
};

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

export default IndexPage;

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { pageKey: { eq: "index" } }) {
            frontmatter {
                title
                heading
                mainpitch {
                    title
                    description
                }
            }
        }
    }
`;
