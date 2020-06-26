import React, { useState } from 'react';
import { graphql } from 'gatsby';
import WorkRoll from '../../components/WorkRoll';
import SEO from '../../components/SEO';
import '../../scss/page.scss';
import { Icon } from '@iconify/react';
import fullIcon from '@iconify/icons-ant-design/fullscreen-outlined';
import exitIcon from '@iconify/icons-ant-design/fullscreen-exit-outlined';

const WorkPage = ({ data }) => {
    const [full, toggleFull] = useState(false);
    return (
        <div className={full ? 'workPage page full' : 'workPage page'}>
            <SEO title={`Work`} />
            {/* <section className="intro">Check what Vitalik has written</section> */}
            <section className="content">
                <div className="title">my work</div>
                <div
                    className="fullToggle"
                    onClick={() => {
                        toggleFull(full => !full);
                    }}
                >
                    <Icon className="icon" icon={full ? exitIcon : fullIcon} />
                </div>
                <WorkRoll full={full} />
            </section>
        </div>
    );
};

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
