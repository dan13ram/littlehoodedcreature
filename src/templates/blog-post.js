import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import Content, { HTMLContent } from '../components/Content';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import EmblaCarousel from '../utils/EmblaCarousel';
import '../scss/blogPost.scss';

export const BlogPostTemplate = ({
    content,
    contentComponent,
    description,
    featuredImages,
    tags,
    title,
    helmet,
}) => {
    const headerRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            headerRef.current &&
                headerRef.current.scrollIntoView({
                    behavior: 'auto',
                    block: 'end',
                });
        }, 50);
    }, []);
    const PostContent = contentComponent || Content;

    return (
        <div className="blogPost">
            {helmet || ''}

            <div className="blogImagesContainer">
                <EmblaCarousel className="blogImages">
                    {featuredImages &&
                        featuredImages.map(featuredImage => (
                            <PreviewCompatibleImage
                                key={featuredImage.id}
                                className="imageItem"
                                imageInfo={{
                                    image: featuredImage.image,
                                    alt: title,
                                }}
                            />
                        ))}
                </EmblaCarousel>
            </div>
            <article className="container">
                <header ref={headerRef}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </header>

                <PostContent content={content} className="content" />
            </article>
            <footer>
                {tags && tags.length ? (
                    <div>
                        <h4>Tags</h4>
                        <ul className="taglist">
                            {tags.map(tag => (
                                <li key={tag + `tag`}>
                                    <Link to={`/tags/${kebabCase(tag)}/`}>
                                        {tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </footer>
        </div>
    );
};

BlogPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
    tags: PropTypes.array,
};

const BlogPost = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <BlogPostTemplate
            content={post.html}
            contentComponent={HTMLContent}
            featuredImages={post.frontmatter.featuredImages}
            description={post.frontmatter.description}
            helmet={
                <SEO
                    titleTemplate="%s | Blog"
                    title={post.frontmatter.title}
                    meta={[
                        {
                            name: 'description',
                            content: post.frontmatter.description,
                        },
                    ]}
                />
            }
            tags={post.frontmatter.tags}
            title={post.frontmatter.title}
        />
    );
};

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default BlogPost;

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                featuredImages {
                    image {
                        childImageSharp {
                            fluid(maxWidth: 2000, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
                description
                tags
            }
        }
    }
`;
