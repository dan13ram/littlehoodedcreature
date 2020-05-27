import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ArtCollectionTemplate = ({
    content,
    contentComponent,
    description,
    tags,
    title,
    helmet
}) => {
    const PostContent = contentComponent || Content;

    return (
        <div className="artCollection">
            {helmet || ""}

            <article className="container">
            <header>
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

ArtCollectionTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object
};

const ArtCollection = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <ArtCollectionTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Art">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
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
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
            }
        }
    }
`;
