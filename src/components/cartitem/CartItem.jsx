import AccessibleImage from "../accessible-image/AccessibleImage.jsx";
import PropTypes from "prop-types";
import { ProductType } from "../../Types.js";
import Button from '/src/components/Buttons/Button.jsx';

const CartItem = ({item, updateQuantity, handleRemoveItem}) => {
    return (
        <div className="cart-item" key={item.id}>
            <div className="cart-item-image">
                <AccessibleImage 
                    src={item.photo || item.images?.[0]} 
                    alt={item.productName || item.title} 
                />
            </div>
            <div className="cart-item-info">
                <h3>{item.productName || item.title}</h3>
                <p>Prijs: €{item.price}</p>
                <div className="quantity-control">
                    <label htmlFor={`quantity-${item.id}`}>Aantal:</label>
                    <input
                        id={`quantity-${item.id}`}
                        type="number"
                        value={item.quantity}
                        min="1"
                        max={item.stock}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                </div>
                <Button
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item.id)}>
                    Verwijderen
                </Button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: ProductType.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    handleRemoveItem: PropTypes.func.isRequired
};

export default CartItem;
