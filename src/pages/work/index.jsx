import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import WorkRoll from "../../components/WorkRoll";
import SEO from "../../components/SEO";
import "../../scss/workPage.scss";

const WorkPage = ({ data }) => (
    <Layout>
        <SEO title={`Work`} />
        <div className="workPage">
            <div className="intro">Check what Vitalik has written</div>
            <div className="content">
                <WorkRoll />
            </div>
        </div>
    </Layout>
);
export default WorkPage;

export const workPageQuery = graphql`
    query WorkQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
