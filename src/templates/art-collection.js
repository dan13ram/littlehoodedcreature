import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import PreviewCompatibleBackgroundImage from '../components/PreviewCompatibleBackgroundImage';
import '../scss/artCollection.scss';

export const ArtCollectionTemplate = ({
    title,
    description,
    featuredImage,
    content,
    tags,
    helmet,
}) => {
    const [margin, setMargin] = useState({});
    const headerRef = useRef(null);
    const setHeaderMargin = mediaQuery => {
        const offset = mediaQuery.matches ? '6.5rem' : '2.5rem';
        setTimeout(() => {
            headerRef.current &&
                setMargin(margin => ({
                    marginTop: `calc(100vh - ${headerRef.current.offsetHeight}px - ${offset})`,
                }));
        }, 50);
    };
    useEffect(() => {
        setTimeout(() => {
            headerRef.current &&
                headerRef.current.scrollIntoView({
                    behavior: 'auto',
                    block: 'end',
                });
        }, 50);
        const mediaQuery = matchMedia('(max-width: 40rem)');
        setHeaderMargin(mediaQuery);
        mediaQuery.addListener(setHeaderMargin);
    }, []);
    return (
        <PreviewCompatibleBackgroundImage
            className="artCollection"
            fluid={featuredImage}
        >
            {helmet || ''}

            <article className="container" style={margin}>
                <header ref={headerRef} id="articleHeader">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </header>

                <div className="content">
                    {content && content.length ? (
                        <div>
                            {content.map((item, index) => (
                                <div key={index} className="contentItem">
                                    {/* <p>{item.title}</p> */}
                                    {/* <p>{item.description}</p> */}
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
        </PreviewCompatibleBackgroundImage>
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

    return (
        <ArtCollectionTemplate
            content={post.frontmatter.content}
            description={post.frontmatter.description}
            featuredImage={post.frontmatter.featuredImage.childImageSharp.fluid}
            helmet={
                <SEO
                    titleTemplate="%s | Work"
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
