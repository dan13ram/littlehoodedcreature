import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import Content, { HTMLContent } from '../components/Content';
import BackgroundImage from 'gatsby-background-image';
import '../scss/post.scss';

export const BlogPostTemplate = ({
    content,
    contentComponent,
    description,
    featuredImage,
    tags,
    title,
    helmet,
}) => {
    const [margin, setMargin] = useState({});
    const headerRef = useRef(null);
    useEffect(() => {
        setMargin(margin => ({
            marginTop: `calc(100vh - ${headerRef.current.offsetHeight}px - 2rem)`,
        }));
    }, []);
    const PostContent = contentComponent || Content;

    return (
        <BackgroundImage className="blogPost post" fluid={featuredImage}>
            {helmet || ''}

            <article className="container" style={margin}>
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
        </BackgroundImage>
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <BlogPostTemplate
            content={post.html}
            contentComponent={HTMLContent}
            featuredImage={post.frontmatter.featuredImage.childImageSharp.fluid}
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
                featuredImage {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                description
                tags
            }
        }
    }
`;
