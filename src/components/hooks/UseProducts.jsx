import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`http://localhost:8080/products`);

                const mappedProducts = response.data.map(product => ({
                    id: product.id,
                    title: product.title,
                    productName: product.product_name || product.title,
                    price: product.price,
                    description: product.description,
                    images: product.images || [],
                    photo: product.photo || product.images?.[0],
                    stock: product.stock
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Er is een fout opgetreden bij het ophalen van de producten');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;
