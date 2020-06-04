import React from 'react';
import PropTypes from 'prop-types';
import { WorkProjectTemplate } from '../../templates/work-project';

const WorkProjectPreview = ({ entry, widgetFor }) => {
    const tags = entry.getIn(['data', 'tags']);
    return (
        <WorkProjectTemplate
            content={widgetFor('body')}
            description={entry.getIn(['data', 'description'])}
            tags={tags && tags.toJS()}
            title={entry.getIn(['data', 'title'])}
        />
    );
};

WorkProjectPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
};

export default WorkProjectPreview;
