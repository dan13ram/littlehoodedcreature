module.exports = {
    siteMetadata: {
        title: `littlehoodedcreature`,
        author: {
            name: `Varsha Naren`,
            summary: `Film-maker & Artist`,
        },
        description: `Film-maker & Artist`,
        siteUrl: `https://littlehoodedcreature.com/`,
        social: {
            twitter: `littlehoodedcreature`,
            linkedIn: `varsha-narendra`,
            instagram: `littlehoodedcreature`,
            youtube: `littlehoodedcreature`,
            vimeo: `littlehoodedcreature`,
            github: `littlehoodedcreature`,
        },
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-svgr',
        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/img`,
                name: 'images',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/pages`,
                name: 'pages',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {
                            name: 'images',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 2048,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            destinationDir: 'static',
                        },
                    },
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/Layout`),
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-transition-link`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GA_PROPERTY_ID,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `littlehoodedcreature`,
                short_name: `littlehoodedcreature`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                //display: `minimal-ui`,
                icon: `static/img/logo.svg`
            },
        },
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ],
};
