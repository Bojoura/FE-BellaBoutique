import { useShopCart } from '/src/contexts/ShopCartContext';
import './ShopCart.css';

const ShopCart = () => {
    const { cartItems, total, handleQuantityChange, handleRemoveItem, isTokenValid } = useShopCart();

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
                        <div className="cart-item" key={item.id}>
                            <div className="cart-item-image">
                                <img src={item.images[0]} alt={item.title}/>
                            </div>
                            <div className="cart-item-info">
                                <h3>{item.title}</h3>
                                <p>Prijs: €{item.price}</p>
                                <div className="quantity-control">
                                    <label htmlFor={`quantity-${item.id}`}>Aantal:</label>
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
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="cart-total">
                    <h3>Totaal: €{total.toFixed(2)}</h3>
                    <button className="checkout-btn">Afrekenen</button>
                </div>
            )}
        </div>
    );
};

export default ShopCart;
