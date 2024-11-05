import './Home.css';
import womenShop from "../../assets/women-shop.jpg";
import useProducts from '../../components/hooks/useProducts';
import { Link } from 'react-router-dom';
import ProductCard from "../../components/productcard/ProductCard.jsx";

const Home = () => {
    const { products, loading, error } = useProducts();
    if (loading) {
        return <p>Laden...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="homepage">
            <section className="hero">
                <div className="hero-text">
                    <h1>{"Welkom bij Bella's Boutique"}</h1>
                    <p>Ontdek de nieuwste mode en trends</p>
                    <Link to="/product">
                        <button className="shop-button">Shop Nu</button>
                    </Link>
                </div>
                <div className="background"><img src={womenShop}/></div>
            </section>
            <section className="featured-products">
                <h2>Uitgelichte Producten</h2>
                <div className="products">
                    {products.slice(0, 3).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;