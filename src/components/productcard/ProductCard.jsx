import "./ProductCard.css";
import PropTypes from "prop-types";
import AccessibleImage from "../AccessibleImage.jsx";

const ProductCard = ({product, callback}) => {
    const { id, images, title, price } = product;
    return (
        <div className="product-item" onClick={() => callback(id)}>
                <AccessibleImage src={images[0]} alt={title} />
                <h3>{title}</h3>
                <p>Prijs: € {price}</p>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    callback: PropTypes.func.isRequired,
};

export default ProductCard;