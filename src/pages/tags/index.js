import React from 'react';
import { kebabCase } from 'lodash';
import SEO from '../../components/SEO';
import { Link, graphql } from 'gatsby';

const TagsPage = ({
    data: {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    },
}) => (
    <div className="tagsPage">
        <SEO title={`Tags`} />
        <h1>Tags</h1>
        <ul>
            {group.map((tag) => (
                <li key={tag.fieldValue}>
                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                        {tag.fieldValue} ({tag.totalCount})
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default TagsPage;

export const tagPageQuery = graphql`
    query TagsQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 1000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
