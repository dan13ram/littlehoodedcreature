import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import BackgroundImage from 'gatsby-background-image';
import '../scss/post.scss';

export const ArtCollectionTemplate = ({
    title,
    description,
    featuredImage,
    content,
    tags,
    helmet,
}) => {
    return (
        <BackgroundImage className="artCollection post" fluid={featuredImage}>
            {helmet || ''}

            <article className="container">
                <header>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </header>

                <div className="content">
                    {content && content.length ? (
                        <div>
                            <h4>Content</h4>
                            {content.map((item, index) => (
                                <div key={index} className="contentItem">
                                    <p>{item.title}</p>
                                    <p>{item.description}</p>
                                    <PreviewCompatibleImage
                                        className="contentImage"
                                        imageInfo={{
                                            image: item.image,
                                            alt: item.title,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
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

ArtCollectionTemplate.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.array,
    helmet: PropTypes.object,
    tags: PropTypes.array,
};

const ArtCollection = ({ data }) => {
    const { markdownRemark: post } = data;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ArtCollectionTemplate
            content={post.frontmatter.content}
            description={post.frontmatter.description}
            featuredImage={post.frontmatter.featuredImage.childImageSharp.fluid}
            helmet={
                <SEO
                    titleTemplate="%s | Art"
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

ArtCollection.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default ArtCollection;

export const pageQuery = graphql`
    query ArtCollectionByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
                featuredImage {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                content {
                    title
                    description
                    image {
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
`;
