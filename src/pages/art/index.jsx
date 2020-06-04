import React from 'react';
import { graphql } from 'gatsby';
import ArtRoll from '../../components/ArtRoll';
import SEO from '../../components/SEO';
import '../../scss/artPage.scss';

const ArtPage = ({ data }) => (
    <div className="artPage">
        <SEO title={`Art`} />
        <div className="content">
            <ArtRoll />
        </div>
    </div>
);
export default ArtPage;

export const artPageQuery = graphql`
    query ArtQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
