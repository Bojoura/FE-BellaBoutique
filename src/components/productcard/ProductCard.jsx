import {Link} from "react-router-dom";
import "./ProductCard.css";
import PropTypes from "prop-types";

const ProductCard = ({product}) => {
    const { id, images, title, price } = product;
    return (
        <div className="product-item">
            <Link to={`/product/${id}`}>
                <img src={images[0]} alt={title}/>
                <h3>{title}</h3>
                <p>Prijs: € {price}</p>
            </Link>
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
};

export default ProductCard;