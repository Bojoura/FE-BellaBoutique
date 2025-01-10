import useProducts from '../../components/hooks/useProducts';
import { useNavigate} from 'react-router-dom';
import ProductCard from "../../components/productcard/ProductCard";
import PropTypes from "prop-types";

const FeaturedProducts = ({title, start, end}) => {
    const navigate = useNavigate();
    const { products, loading, error } = useProducts();
    if (loading) {
        return <p>Laden...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const useHandleSelectProduct = (id) => {
        navigate(`/product/` + id)
    }

    return (
        <section className="featured-products">
            <h2>{title}</h2>
            <div className="products">
                {products.slice(start, end).map((product) => (
                    <ProductCard key={product.id} product={product} callback={useHandleSelectProduct} />
                ))}
            </div>
        </section>
    );
};

FeaturedProducts.propTypes = {
    title: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
};

export default FeaturedProducts;