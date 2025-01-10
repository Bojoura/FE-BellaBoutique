import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isValidProduct } from '../../Types';
import './ProductDetail.css';
import {useShopCart} from '/src/contexts/ShopCartContext';
import Button from "../../components/buttons/Button.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { handleAddItem } = useShopCart();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const productResponse = await axios.get(`http://localhost:8080/products/${id}`);

                const reviewsResponse = await axios.get(`http://localhost:8080/products/${id}/reviews`);

                if (!productResponse.data || !isValidProduct(productResponse.data)) {
                    throw new Error('Ongeldige product data ontvangen');
                }
                setProduct(productResponse.data);
                setReviews(reviewsResponse.data);
            } catch (error) {
                if (error.response?.status === 404) {
                    setError('Product niet gevonden');
                } else {
                    setError('Er is een fout opgetreden bij het ophalen van het product');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
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

    const renderRating = (rating) => {
        const maxStars = 5;
        return (
            <div className="star-rating">
                {Array.from({ length: maxStars }, (_, index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={`star ${index < rating ? 'filled' : ''}`}
                        color={index < rating ? '#DBA6B3' : '#E6E6E6'}
                    />
                ))}
            </div>
        );
    };

    if (loading) return <div>Laden...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product niet gevonden</div>;

    return (
        <div className="product-detail-container">
            <Button to="/product" className="back-to-products-btn" onClick={handleGoBack}>
                Terug naar producten
            </Button>

            <div className="product-detail">
                <div className="product-image">
                    <img src={product.thumbnail} alt={product.title}/>
                </div>

                <div className="product-info">
                    <h2>{product.title}</h2>
                    <p className="description">{product.description}</p>
                    <h3 className="price">Prijs: € {product.price.toFixed(2)}</h3>
                    {product.discount_percentage > 0 && (
                        <p>Korting: {product.discount_percentage}%</p>
                    )}
                    <p>Er zijn nog {product.stock} stuk(s) op voorraad.</p>
                    <Button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Voeg toe aan winkelwagen
                    </Button>
                </div>
            </div>

            <div className="reviews">
                {product.rating && (
                    <div className="review-container">
                        <h2>Reviews</h2>
                        <div className="review-wrapper">
                            <span className="review-value">{product.rating}</span>
                            {renderRating(product.rating)}

                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div className="review-box" key={review.id}>
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
                )}
            </div>
        </div>


    )
        ;
};

export default ProductDetail;
