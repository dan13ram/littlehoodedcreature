import React from 'react';
import PropTypes from 'prop-types';
import { WorkProjectTemplate } from '../../templates/work-project';

const WorkProjectPreview = ({ entry, widgetFor }) => {
    const tags = entry.getIn(['data', 'tags']);
    return (
        <WorkProjectTemplate
            tags={tags && tags.toJS()}
            title={entry.getIn(['data', 'title'])}
            description={entry.getIn(['data', 'description'])}
            liveUrl={entry.getIn(['data', 'liveUrl'])}
            codeUrl={entry.getIn(['data', 'codeUrl'])}
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
