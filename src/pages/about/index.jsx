import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../../components/SEO';
import useSiteMetadata from '../../components/SiteMetadata';
import Content, { HTMLContent } from '../../components/Content';
import Image from 'gatsby-image';
import '../../scss/page.scss';
import '../../scss/aboutPage.scss';

export const AboutPageTemplate = ({
    title,
    content,
    contentComponent,
    fixedAvatar,
}) => {
    const PageContent = contentComponent || Content;
    const { author, social } = useSiteMetadata();

    return (
        <div className="aboutPage page">
            <SEO title={`About`} />
            <section className="about-me">
                <Image
                    className="avatar"
                    fixed={fixedAvatar}
                    alt={author.name}
                />
                <PageContent className="content" content={content} />
            </section>
        </div>
    );
};

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
    const { avatar, markdownRemark } = data;
    return (
        <AboutPageTemplate
            contentComponent={HTMLContent}
            fixedAvatar={avatar.childImageSharp.fixed}
            title={markdownRemark.frontmatter.title}
            content={markdownRemark.html}
        />
    );
};

export default AboutPage;

export const aboutQuery = graphql`
    query AboutPageQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
            childImageSharp {
                fixed(width: 300, height: 300) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        markdownRemark(frontmatter: { pageKey: { eq: "about" } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
