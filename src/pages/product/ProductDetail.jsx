import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useShopCart} from '/src/contexts/ShopCartContext';
import './ProductDetail.css';
import axios from "axios";

const ProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { handleAddItem } = useShopCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const productResponse = await axios.get(`http://localhost:8080/products/${id}`);
                    console.log(productResponse.data);
                    setProduct(productResponse.data);

                    const reviewsResponse = await axios.get(`http://localhost:8080/products/${id}/reviews`);
                    console.log(reviewsResponse.data);
                    setReviews(reviewsResponse.data);

                    setLoading(false);

                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/products');
        }
    };

    const handleAddToCart = () => {
        if (product) {
            handleAddItem(product.id, 1);
        }
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    if (error) {
        return <div>Fout: {error}</div>;
    }

    if (!product) {
        return <div>Product niet gevonden</div>;
    }

    return (
        <div className="product-detail-container">
            <button className="back-to-products-btn" onClick={handleGoBack}>
                Terug naar producten
            </button>

            <div className="product-detail">
                <div className="product-image">
                    <img src={product.images[0]} alt={product.title}/>
                </div>
                <div className="product-info">
                    <h2>{product.title}</h2>
                    <p className="price">€ {product.price}</p>
                    <p className="description">{product.description}</p>
                    <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.stock === 0}>
                        Voeg toe aan winkelwagen
                    </button>
                </div>
            </div>

            <div className="reviews">
                <h2>Customer Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div className="review" key={review.id}>
                            <h4>{review.reviewerName} - {review.rating}/5</h4>
                            <p>{review.comment}</p>
                            <small>{new Date(review.reviewDate).toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>Dit product heeft nog geen reviews.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
