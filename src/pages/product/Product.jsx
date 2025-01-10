import "./Product.css";
import ProductCard from "../../components/productcard/ProductCard";
import useProducts from "../../components/hooks/useProducts";
import {useNavigate, useSearchParams} from "react-router-dom";

const ProductList = () => {
    const {products, loading, error} = useProducts();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const useHandleSelectProduct = (id) => {
        navigate(`/product/${id}`)
    }

    if (loading) {
        return <p>Laden...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const query = searchParams.get("search");
    let filteredProducts = products;

    if (query) {
        filteredProducts = products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));

        if (filteredProducts.length === 0) {
            return <p>Geen producten gevonden</p>;
        }
    }


    return (
        <div className="product-container">
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} callback={useHandleSelectProduct} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
