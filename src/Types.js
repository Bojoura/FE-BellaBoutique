import PropTypes from "prop-types";

const Product = PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number
}).isRequired;

export default Product;