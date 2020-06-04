import React from 'react';
import PropTypes from 'prop-types';
// import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const FeatureGrid = ({ gridItems }) => (
    <div className="featureGrid">
        {gridItems.map((item) => (
            <section key={item.text} className="featureItem">
                {/* <PreviewCompatibleImage imageInfo={item} /> */}
                <p>{item.text}</p>
            </section>
        ))}
    </div>
);

FeatureGrid.propTypes = {
    gridItems: PropTypes.arrayOf(
        PropTypes.shape({
            //image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            text: PropTypes.string,
        })
    ),
};

export default FeatureGrid;
