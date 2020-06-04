import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import '../scss/roll.scss';

class BlogRoll extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className="blogRoll roll">
                {posts &&
                    posts.map(({ node: post }) => (
                        <article
                            key={post.id}
                            className={
                                post.frontmatter.featuredPost
                                    ? 'rollItem blogPost featured'
                                    : 'rollItem blogPost'
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
                                <p>{post.excerpt}</p>
                                <span>Keep Reading →</span>
                            </Link>
                        </article>
                    ))}
            </div>
        );
    }
}

BlogRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default () => (
    <StaticQuery
        query={graphql`
            query BlogRollQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: { templateKey: { eq: "blog-post" } }
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
                                templateKey
                                date(formatString: "MMMM DD, YYYY")
                                featuredPost
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
        render={(data, count) => <BlogRoll data={data} count={count} />}
    />
);
