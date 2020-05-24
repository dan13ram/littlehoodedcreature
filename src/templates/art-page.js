import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
// import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const ArtPageTemplate = ({
    // image,
    title,
    heading,
    description,
    intro,
    main,
    testimonials,
    // fullImage,
    pricing
}) => (
    <div className="artPage">
        <h2>{title}</h2>
        <h3>{heading}</h3>
        <p>{description}</p>
        <Features gridItems={intro.blurbs} />
        <h3>{main.heading}</h3>
        <p>{main.description}</p>
        <article>{/* <PreviewCompatibleImage imageInfo={image} /> */}</article>
        <Testimonials testimonials={testimonials} />
        <h2>{pricing.heading}</h2>
        <p>{pricing.description}</p>
        <Pricing data={pricing.plans} />
    </div>
);

ArtPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
    intro: PropTypes.shape({
        blurbs: PropTypes.array
    }),
    main: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    }),
    testimonials: PropTypes.array,
    fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    pricing: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        plans: PropTypes.array
    })
};

const ArtPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <ArtPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                heading={frontmatter.heading}
                description={frontmatter.description}
                intro={frontmatter.intro}
                main={frontmatter.main}
                testimonials={frontmatter.testimonials}
                fullImage={frontmatter.fullImage}
                pricing={frontmatter.pricing}
            />
        </Layout>
    );
};

ArtPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object
        })
    })
};

export default ArtPage;

export const artPageQuery = graphql`
    query ArtPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                # image {
                #     childImageSharp {
                #         fluid(maxWidth: 2048, quality: 100) {
                #             ...GatsbyImageSharpFluid
                #         }
                #     }
                # }
                heading
                description
                intro {
                    blurbs {
                        # image {
                        #     childImageSharp {
                        #         fluid(maxWidth: 240, quality: 64) {
                        #             ...GatsbyImageSharpFluid
                        #         }
                        #     }
                        # }
                        text
                    }
                    heading
                    description
                }
                main {
                    heading
                    description
                    # image1 {
                    #     alt
                    #     image {
                    #         childImageSharp {
                    #             fluid(maxWidth: 526, quality: 92) {
                    #                 ...GatsbyImageSharpFluid
                    #             }
                    #         }
                    #     }
                    # }
                    # image2 {
                    #     alt
                    #     image {
                    #          childImageSharp {
                    #              fluid(maxWidth: 526, quality: 92) {
                    #                  ...GatsbyImageSharpFluid
                    #              }
                    #          }
                    #     }
                    # }
                    # image3 {
                    #     alt
                    #     image {
                    #         childImageSharp {
                    #             fluid(maxWidth: 1075, quality: 72) {
                    #                 ...GatsbyImageSharpFluid
                    #             }
                    #         }
                    #     }
                    # }
                }
                testimonials {
                    author
                    quote
                }
                pricing {
                    heading
                    description
                    plans {
                        description
                        items
                        plan
                        price
                    }
                }
            }
        }
    }
`;
