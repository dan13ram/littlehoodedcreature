import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import '../scss/blogRoll.scss';

class BlogRoll extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className="blogRoll">
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
                            <div className="featuredImage">
                                <PreviewCompatibleImage
                                    imageInfo={{
                                        image: post.frontmatter.featuredImage,
                                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                    }}
                                />
                            </div>
                            <div className="itemContainer">
                                <div className="itemContent">
                                    <p className="center itemTitle">
                                        {post.frontmatter.title}
                                    </p>
                                    <p className="center itemDate">
                                        {post.frontmatter.date}
                                    </p>
                                    <p className="itemDescription">
                                        {post.frontmatter.description ||
                                            post.excerpt}
                                    </p>
                                    <Link to={post.fields.slug}>
                                        Read {'\u276F'}
                                    </Link>
                                </div>
                            </div>
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
                                description
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
