import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Product from "./pages/product/Product.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";
import ShopCart from "./pages/shopcart/ShopCart.jsx";
import Account from "./pages/account/Account.jsx";
import AccountDetail from "./pages/account/AccountDetail.jsx";
import Contact from "./pages/contact/Contact.jsx";

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/product/:id" element={<ProductDetail/>} />
                <Route path="/cart" element={<ShopCart/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/accountdetail" element={<AccountDetail/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </>
    )
}