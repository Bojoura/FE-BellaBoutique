import './Home.css';
import womenShop from "../../assets/women-shop.jpg";
import {Link} from 'react-router-dom';
import FeaturedProducts from "../../components/featured-products/FeaturedProducts.jsx";
import AccessibleImage from "../../components/AccessibleImage.jsx";

const Home = () => {

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
                <div className="background"><AccessibleImage src={womenShop} alt="view the women shop"></AccessibleImage></div>
            </section>
            <section className="featured-products">
                <h2>Uitgelichte Producten</h2>
                <FeaturedProducts start={0} end={3}/>
            </section>
        </div>
    );
};

export default Home;