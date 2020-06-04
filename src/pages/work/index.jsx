import React from 'react';
import { graphql } from 'gatsby';
import WorkRoll from '../../components/WorkRoll';
import SEO from '../../components/SEO';
import '../../scss/workPage.scss';

const WorkPage = ({ data }) => (
    <div className="workPage">
        <SEO title={`Work`} />
        <div className="intro">Check what Vitalik has written</div>
        <div className="content">
            <WorkRoll />
        </div>
    </div>
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
