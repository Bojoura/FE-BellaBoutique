import {Link} from "react-router-dom";
import "./ProductCard.css";

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

export default ProductCard;