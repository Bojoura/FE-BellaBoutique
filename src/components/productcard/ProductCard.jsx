import "./ProductCard.css";
import PropTypes from "prop-types";
import AccessibleImage from "../accessible-image/AccessibleImage.jsx";
import Product from "../../Types.js";

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
    product: Product,
    callback: PropTypes.func.isRequired,
};

export default ProductCard;