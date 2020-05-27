import React from "react";
import PropTypes from "prop-types";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { Helmet } from "react-helmet";

const SEO = ({ description, lang, meta, title }) => {
    const siteMetadata = useSiteMetadata();
    const metaDescription = description || siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang
            }}
            title={title}
            titleTemplate={`%s | ${siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription
                },
                {
                    property: `og:title`,
                    content: title
                },
                {
                    property: `og:description`,
                    content: metaDescription
                },
                {
                    property: `og:type`,
                    content: `website`
                },
                {
                    name: `twitter:card`,
                    content: `summary`
                },
                {
                    name: `twitter:creator`,
                    content: siteMetadata.social.twitter
                },
                {
                    name: `twitter:title`,
                    content: title
                },
                {
                    name: `twitter:description`,
                    content: metaDescription
                },
                {
                    name: `theme-color`,
                    content: `#fff`
                },
                {
                    name: `msapplication-TileColor`,
                    content: `#fff`
                },
                {
                    property: `og:type`,
                    content: `website`
                }
                // {
                //     property: `og:image`,
                //     content: `${withPrefix(`/`)}img/om-logo.png`
                // }
            ].concat(meta)}
        />
    );
};

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired
};

export default SEO;
