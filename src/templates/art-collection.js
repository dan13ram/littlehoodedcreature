import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const ArtCollection = ({ data }) => {
    const {
        markdownRemark: {
            frontmatter: { title, description, tags, contents }
        }
    } = data;

    return (
        <Layout>
            <div className="artCollection">
                <SEO
                    titleTemplate="%s | Art"
                    title={title}
                    meta={[
                        {
                            name: "description",
                            content: description
                        }
                    ]}
                />

                <article className="container">
                    <header>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </header>

                    <div className="content">
                        {contents && contents.length ? (
                            <div>
                                <h4>Contents</h4>
                                <ul className="imagelist">
                                    {contents.map(content => (
                                        <li key={content + `img`}>
                                            <span>{content.title}</span>
                                            <span>{content.image}</span>
                                            <span>{content.width}</span>
                                            <span>{content.height}</span>
                                            <span>{content.size}</span>
                                        </li>
                                    ))}
                                </ul>
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
        </Layout>
    );
};

ArtCollection.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object
    })
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
                contents {
                    title
                    image
                    width
                    height
                    size
                }
            }
        }
    }
`;
