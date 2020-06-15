import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../pages/about/index';

const AboutPagePreview = ({ entry, widgetFor }) => {
    const data = entry.getIn(['data']).toJS();

    if (data) {
        return (
            <AboutPageTemplate
                avatarImage={data.avatarImage}
                content={widgetFor('body')}
                title={data.title}
            />
        );
    } else {
        return <div>Loading...</div>;
    }
};

AboutPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
};

export default AboutPagePreview;
