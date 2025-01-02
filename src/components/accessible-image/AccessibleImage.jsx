import PropTypes from "prop-types";

const AccessibleImage = ({src, alt}) => {

    return (
        <img src={src} alt={alt}/>
    );
};

AccessibleImage.propTypes = {
    src: PropTypes.string.isRequired || PropTypes.object.isRequired,
    alt: PropTypes.string.isRequired,
};

export default AccessibleImage;