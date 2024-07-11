import { useState, useEffect } from 'react';
import "./Product.css";
import axios from 'axios';


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');

                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className="product-container container">
                <h1>Kleding</h1>

                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.title}/>
                            <h3>{product.title}</h3>
                            <p>Prijs: € {product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductList;