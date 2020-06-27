import React from 'react';
import PropTypes from 'prop-types';
import { ArtCollectionTemplate } from '../../templates/art-collection';

const ArtCollectionPreview = ({ entry, widgetFor }) => {
    const tags = entry.getIn(['data', 'tags']);
    const entryContent = entry.getIn(['data', 'content']);
    const content = entryContent ? entryContent.toJS() : [];

    return (
        <ArtCollectionTemplate
            content={content}
            tags={tags && tags.toJS()}
            title={entry.getIn(['data', 'title'])}
            description={entry.getIn(['data', 'description'])}
            preview={true}
        />
    );
};

ArtCollectionPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
};

export default ArtCollectionPreview;
