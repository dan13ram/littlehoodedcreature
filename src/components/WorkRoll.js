import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import BackgroundImage from 'gatsby-background-image';
import '../scss/workRoll.scss';

class WorkRoll extends React.Component {
    render() {
        const { data, featured, full } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className={full ? 'workRoll full' : 'workRoll'}>
                {posts &&
                    posts.map(({ node: post }) => {
                        if (featured && !post.frontmatter.featuredItem) {
                            return null;
                        }
                        return (
                            <AniLink
                                fade
                                to={post.fields.slug}
                                key={post.id}
                                className={
                                    post.frontmatter.featuredItem
                                        ? 'rollItem featured'
                                        : 'rollItem'
                                }
                            >
                                <BackgroundImage
                                    fluid={
                                        post.frontmatter.featuredImage
                                            .childImageSharp.fluid
                                    }
                                    className="itemContainer"
                                >
                                    <div className="itemContent">
                                        <p className="center itemTitle">
                                            {post.frontmatter.title}
                                        </p>
                                        <p className="center itemDate">
                                            {post.frontmatter.date}
                                        </p>
                                    </div>
                                </BackgroundImage>
                            </AniLink>
                        );
                    })}
            </div>
        );
    }
}

WorkRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default props => (
    <StaticQuery
        query={graphql`
            query WorkRollQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: { templateKey: { eq: "art-collection" } }
                    }
                ) {
                    edges {
                        node {
                            excerpt(pruneLength: 400)
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                description
                                templateKey
                                date(formatString: "MMMM DD, YYYY")
                                featuredItem
                                featuredImage {
                                    childImageSharp {
                                        fluid(maxWidth: 2000, quality: 100) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => (
            <WorkRoll data={data} count={count} full={props.full} />
        )}
    />
);
