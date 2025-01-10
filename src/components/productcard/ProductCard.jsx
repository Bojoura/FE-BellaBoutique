import "./ProductCard.css";
import PropTypes from "prop-types";
import AccessibleImage from "../accessible-image/AccessibleImage.jsx";
import { ProductType } from "../../Types.js";

const ProductCard = ({product, callback}) => {
    const { id, title, productName, price, photo, images } = product;
    
    return (
        <div className="product-item" onClick={() => callback(id)}>
            <AccessibleImage 
                src={photo || images?.[0]} 
                alt={productName || title} 
            />
            <h3>{productName || title}</h3>
            <p>Prijs: € {price}</p>
        </div>
    );
};

ProductCard.propTypes = {
    product: ProductType.isRequired,
    callback: PropTypes.func.isRequired,
};

export default ProductCard;