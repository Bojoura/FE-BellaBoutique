import { createContext, useContext, useState, useEffect } from 'react';
import checkTokenValidity from '/src/helpers/CheckTokenValidation';
import axios from "axios";

const ShopCartContext = createContext();

export const useShopCart = () => useContext(ShopCartContext);

export const ShopCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isTokenValid, setIsTokenValid] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsTokenValid(checkTokenValidity(token));
        }

        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (storedCartItems.length > 0) {
            getProducts(storedCartItems).catch(console.log);
            calculateTotal(storedCartItems);
        }
    }, []);

    const getProducts = async (storedCartItems) => {
        const products = await Promise.all(storedCartItems.map(async (item) => {
            const product = await axios.get(`http://localhost:8080/products/${item.productId}`);
            return {
                ...item,
                ...product.data,
            };
        }));
        setCartItems(products);
    };

    const handleAddItem = async (productId, quantity = 1) => {
        const existingItem = cartItems.find(item => item.id === productId);

        if (existingItem) {
            handleQuantityChange(productId, existingItem.quantity + quantity);
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/products/${productId}`);
                const newItem = {
                    ...response.data,
                    quantity
                };

                const updatedCartItems = [...cartItems, newItem];
                setCartItems(updatedCartItems);
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                calculateTotal(updatedCartItems);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
    };

    const handleQuantityChange = (id, quantity) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? {...item, quantity: Number(quantity)} : item
        );
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        calculateTotal(updatedCartItems);
    };

    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        calculateTotal(updatedCartItems);
    };

    const calculateTotal = (items) => {
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalPrice);
    };

    return (
        <ShopCartContext.Provider value={{
            cartItems,
            total,
            handleQuantityChange,
            handleAddItem,
            handleRemoveItem,
            isTokenValid
        }}>
            {children}
        </ShopCartContext.Provider>
    );
};
