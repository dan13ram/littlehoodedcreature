import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import '../scss/roll.scss';

class ArtRoll extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data, featured } = this.props;
        const { edges: posts } = data.allMarkdownRemark;
        console.log(this.props);

        return (
            <div className="artRoll roll">
                {posts &&
                    posts.map(({ node: post }) => {
                        if (featured && !post.frontmatter.featuredItem) {
                            return null;
                        }
                        return (
                            <article
                                key={post.id}
                                className={
                                    post.frontmatter.featuredItem
                                        ? 'rollItem artCollection featured'
                                        : 'rollItem artCollection'
                                }
                            >
                                {post.frontmatter.featuredImage && (
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
                                )}
                                <div className="itemContent">
                                    <p className="post-meta">
                                        {post.frontmatter.title}
                                        <span> &bull; </span>
                                        <span>{post.frontmatter.date}</span>
                                    </p>
                                    <p>{post.frontmatter.description}</p>
                                    <Link to={post.fields.slug}>
                                        View →
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
            </div>
        );
    }
}

ArtRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
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
        render={(data, count) => <ArtRoll data={data} count={count} />}
    />
);
