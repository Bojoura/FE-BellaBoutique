import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import Account from "./pages/account/Account.jsx";
import Product from "./pages/product/Product.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Footer from "./components/footer/Footer.jsx";
import Bar from "./components/bar/Bar.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";

function App() {
  return (
    <>
        <header>
            <Navbar/>
            <Bar/>
        </header>

        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/product/:id" element={<ProductDetail/>} />
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/account" element={<Account/>}/>
            </Routes>
        </main>

        <Footer/>
    </>
  )
}

export default App
