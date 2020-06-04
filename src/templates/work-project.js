import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import '../scss/post.scss';

const WorkProject = ({ data }) => {
    const {
        markdownRemark: {
            frontmatter: { title, description, tags, liveUrl, codeUrl },
        },
    } = data;

    return (
        <div className="workProject post">
            <SEO
                titleTemplate="%s | Work"
                title={title}
                meta={[
                    {
                        name: 'description',
                        content: description,
                    },
                ]}
            />

            <article className="container">
                <header>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </header>

                <div className="content">
                    <p> {codeUrl} </p>
                    <p> {liveUrl} </p>
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

WorkProject.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default WorkProject;

export const pageQuery = graphql`
    query WorkProjectByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
                codeUrl
                liveUrl
            }
        }
    }
`;
