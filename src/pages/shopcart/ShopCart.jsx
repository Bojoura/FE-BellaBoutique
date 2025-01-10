import { useShopCart } from '/src/contexts/ShopCartContext';
import './ShopCart.css';
import CartItem from "../../components/CartItem/CartItem.jsx";
import Button from '/src/components/Buttons/Button.jsx';

const ShopCart = () => {
    const { cartItems, total, updateQuantity, handleRemoveItem, isTokenValid } = useShopCart();

    if (!isTokenValid) {
        return <p>Uw sessie is verlopen. Log opnieuw in om verder te gaan.</p>;
    }

    return (
        <div className="shopping-cart-container">
            <h2>Winkelwagen</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Uw winkelwagentje is leeg.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <CartItem item={item} key={item.id} label={"Aantal:"} updateQuantity={updateQuantity} handleRemoveItem={handleRemoveItem} />
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="cart-total">
                    <h3>Totaal: €{total.toFixed(2)}</h3>
                    <Button className="checkout-btn">Afrekenen</Button>
                </div>
            )}
        </div>
    );
};

export default ShopCart;
