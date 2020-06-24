import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import '../scss/post.scss';

export const ArtCollectionTemplate = ({
    title,
    description,
    content,
    tags,
    helmet,
}) => {
    return (
        <div className="artCollection post">
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
        </div>
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
                content {
                    title
                    description
                    image {
                        childImageSharp {
                            fluid(maxWidth: 500, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`;
