import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-icomoon-free/eye';
import multipleImageIcon from '@iconify/icons-mdi/checkbox-multiple-blank';

import '../scss/blogRoll.scss';

class BlogRoll extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className="blogRoll">
                {posts &&
                    posts.map(({ node: post }) => (
                        <BlogPost key={post.id} post={post} />
                    ))}
            </div>
        );
    }
}

const BlogPost = ({ post }) => {
    const showMultipleImageIcon = post.frontmatter.featuredImages.length > 1;
    return (
        <article
            className={
                post.frontmatter.featuredPost
                    ? 'rollItem blogPost featured'
                    : 'rollItem blogPost'
            }
        >
            <div className="itemContainer">
                <div className="itemHeader">
                    <span className="itemTitle">{post.frontmatter.title}</span>
                    <span className="itemDate">{post.frontmatter.date}</span>
                </div>
                <div className="itemImage">
                    <PreviewCompatibleImage
                        imageInfo={{
                            image: post.frontmatter.featuredImages[0].image,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                    />
                    {showMultipleImageIcon && (
                        <Icon
                            icon={multipleImageIcon}
                            className="multipleImageIcon"
                        />
                    )}
                </div>
                <p className="itemDescription">{post.excerpt}</p>
                <AniLink fade to={post.fields.slug} className="readSlab">
                    <Icon icon={eyeIcon} />
                </AniLink>
            </div>
        </article>
    );
};

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
                                featuredImages {
                                    image {
                                        childImageSharp {
                                            fluid(
                                                maxWidth: 2000
                                                quality: 100
                                            ) {
                                                ...GatsbyImageSharpFluid
                                            }
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
