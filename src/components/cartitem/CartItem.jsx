import AccessibleImage from "../accessible-image/AccessibleImage.jsx";
import PropTypes from "prop-types";
import Product from "../../Types.js";

const CartItem = ({item, handleQuantityChange, handleRemoveItem, label}) => {

    return (
        <div className="cart-item" key={item.id}>
            <div className="cart-item-image">
                <AccessibleImage src={item.images[0]} alt={item.title} />
            </div>
            <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Prijs: €{item.price}</p>
                <div className="quantity-control">
                    <label htmlFor={`quantity-${item.id}`}>{label}</label>
                    <input
                        id={`quantity-${item.id}`}
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                </div>
                <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
                    Verwijderen
                </button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: Product,
    handleQuantityChange: PropTypes.func.isRequired,
    handleRemoveItem: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default CartItem;
