import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import useSiteMetadata from "../components/SiteMetadata";
import Content, { HTMLContent } from "../components/Content";
import Image from "gatsby-image";
import { Icon } from "@iconify/react";
import instagramOutlined from "@iconify/icons-ant-design/instagram-outlined";
import twitterOutlined from "@iconify/icons-ant-design/twitter-outlined";
import linkedinOutlined from "@iconify/icons-ant-design/linkedin-outlined";
import githubOutlined from "@iconify/icons-ant-design/github-outlined";

export const AboutPageTemplate = ({
    title,
    content,
    contentComponent,
    fixedAvatar
}) => {
    const PageContent = contentComponent || Content;
    const { author, social } = useSiteMetadata();

    return (
        <div className="aboutPage">
            <Image className="avatar" fixed={fixedAvatar} alt={author.name} />
            <PageContent className="content" content={content} />
            <div className="intro">
                <a
                    href={`https://github.com/${social.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className="icon" icon={githubOutlined} /> Github
                </a>
                <a
                    href={`https://instagram.com/${social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className="icon" icon={instagramOutlined} /> Instagram
                </a>
                <a
                    href={`https://twitter.com/${social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className="icon" icon={twitterOutlined} /> Twitter
                </a>
                <a
                    href={`https://linkedin.com/in/${social.linkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className="icon" icon={linkedinOutlined} /> LinkedIn
                </a>
            </div>
        </div>
    );
};

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
    const { avatar, markdownRemark: post } = data;

    return (
        <Layout>
            <AboutPageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.html}
                fixedAvatar={avatar.childImageSharp.fixed}
            />
        </Layout>
    );
};

AboutPage.propTypes = {
    data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
            childImageSharp {
                fixed(width: 300, height: 300) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
