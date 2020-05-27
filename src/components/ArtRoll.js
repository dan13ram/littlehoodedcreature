import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import "../scss/artRoll.scss";

class ArtRoll extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className="artRoll">
                {posts &&
                    posts.map(({ node: post }) => (
                        <article
                            key={post.id}
                            className={
                                post.frontmatter.featuredpost
                                    ? "artCollection featured"
                                    : "artCollection"
                            }
                        >
                            <Link to={post.fields.slug}>
                                <header>
                                    {post.frontmatter.featuredimage ? (
                                        <div className="featuredImage">
                                            <PreviewCompatibleImage
                                                imageInfo={{
                                                    image:
                                                        post.frontmatter
                                                            .featuredimage,
                                                    alt: `featured image thumbnail for post ${post.frontmatter.title}`
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
                                <footer>View More →</footer>
                            </Link>
                        </article>
                    ))}
            </div>
        );
    }
}

ArtRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array
        })
    })
};

export default () => (
    <StaticQuery
        query={graphql`
            query ArtRollQuery {
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
                                featuredpost
                                featuredimage {
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
        render={(data, count) => <ArtRoll data={data} count={count} />}
    />
);
