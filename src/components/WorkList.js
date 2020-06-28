import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import '../scss/workList.scss';

class WorkList extends React.Component {
    render() {
        const { data } = this.props;
        let { edges: posts } = data.allMarkdownRemark;
        // let i = 0;
        // while (i < 3) {
        //     i++;
        //     posts = posts.concat([...posts]);
        // }

        return (
            <div className="workList">
                <div className="workListInner">
                    {posts &&
                        posts.map(({ node: post }) => {
                            return (
                                <AniLink
                                    fade
                                    to={post.fields.slug}
                                    key={post.id}
                                    className="listItem"
                                >
                                    {post.frontmatter.title}
                                </AniLink>
                            );
                        })}
                </div>
            </div>
        );
    }
}

WorkList.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default props => (
    <StaticQuery
        query={graphql`
            query WorkListQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: { templateKey: { eq: "art-collection" } }
                    }
                ) {
                    edges {
                        node {
                            excerpt(pruneLength: 400)
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => <WorkList data={data} count={count} />}
    />
);
