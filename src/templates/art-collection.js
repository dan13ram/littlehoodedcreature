import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import SEO from '../components/SEO';
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
                                    <Image
                                        className="avatar"
                                        fluid={item.image.childImageSharp.fluid}
                                        alt={item.title}
                                    />
                                    <p>{item.width}</p>
                                    <p>{item.height}</p>
                                    <p>{item.size}</p>
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
                            {tags.map((tag) => (
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
    content: PropTypes.array,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
};

const ArtCollection = ({ data }) => {
    const { markdownRemark: post } = data;

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
                    image {
                        childImageSharp {
                            fluid(maxWidth: 500, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    width
                    height
                    size
                }
            }
        }
    }
`;
