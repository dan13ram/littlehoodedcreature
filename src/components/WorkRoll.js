import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import '../scss/roll.scss';

class WorkRoll extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className="workRoll roll">
                {posts &&
                    posts.map(({ node: post }) => (
                        <article
                            key={post.id}
                            className={
                                post.frontmatter.featuredPost
                                    ? 'rollItem workProject featured'
                                    : 'rollItem workProject'
                            }
                        >
                            <Link to={post.fields.slug}>
                                <header>
                                    {post.frontmatter.featuredImage ? (
                                        <div className="featuredImage">
                                            <PreviewCompatibleImage
                                                imageInfo={{
                                                    image:
                                                        post.frontmatter
                                                            .featuredImage,
                                                    alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                    <p className="post-meta">
                                        {post.frontmatter.title}
                                        <span> &bull; </span>
                                        <span>{post.frontmatter.date}</span>
                                    </p>
                                </header>
                                <p>{post.frontmatter.description}</p>
                                <span>View More →</span>
                            </Link>
                        </article>
                    ))}
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

export default () => (
    <StaticQuery
        query={graphql`
            query WorkRollQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: { templateKey: { eq: "work-project" } }
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
                                        fluid(maxWidth: 120, quality: 100) {
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
        render={(data, count) => <WorkRoll data={data} count={count} />}
    />
);
