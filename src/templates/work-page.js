import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
//import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const WorkPageTemplate = ({
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
    <div className="workPage">
        <h2>{title}</h2>
        <h3>{heading}</h3>
        <p>{description}</p>
        <Features gridItems={intro.blurbs} />
        <h3>{main.heading}</h3>
        <p>{main.description}</p>
        <article>
            {/* <PreviewCompatibleImage imageInfo={main.image1} /> */}
        </article>
        <Testimonials testimonials={testimonials} />
        <h2>{pricing.heading}</h2>
        <p>{pricing.description}</p>
        <Pricing data={pricing.plans} />
    </div>
);

WorkPageTemplate.propTypes = {
    // image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
    intro: PropTypes.shape({
        blurbs: PropTypes.array
    }),
    main: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string
    }),
    testimonials: PropTypes.array,
    pricing: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        plans: PropTypes.array
    })
};

const WorkPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <WorkPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                heading={frontmatter.heading}
                description={frontmatter.description}
                intro={frontmatter.intro}
                main={frontmatter.main}
                testimonials={frontmatter.testimonials}
                // fullImage={frontmatter.fullImage}
                pricing={frontmatter.pricing}
            />
        </Layout>
    );
};

WorkPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object
        })
    })
};

export default WorkPage;

export const workPageQuery = graphql`
    query WorkPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                heading
                description
                intro {
                    blurbs {
                        text
                    }
                    heading
                    description
                }
                main {
                    heading
                    description
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
