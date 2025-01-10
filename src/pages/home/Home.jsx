import './Home.css';
import womenShop from "../../assets/women-shop.jpg";
import FeaturedProducts from "../../components/featured-products/FeaturedProducts.jsx";
import AccessibleImage from "../../components/accessible-image/AccessibleImage.jsx";
import Button from "../../components/buttons/Button.jsx";

const Home = () => {

    return (
        <div className="homepage">
            <section className="hero">
                <div className="hero-text">
                    <h1>{"Welkom bij Bella's Boutique"}</h1>
                    <p>Ontdek de nieuwste mode en trends</p>
                    <Button to="/product" className="shop-button">
                        Shop Nu
                    </Button>
                </div>
                <div className="background"><AccessibleImage src={womenShop} alt="view the women shop"/></div>
            </section>
            <section className="featured-products">
                <FeaturedProducts title={"Uitgelichte producten"} start={3} end={6}/>
            </section>
        </div>
    );
};

export default Home;