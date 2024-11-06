import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Product from "./pages/product/Product";
import Footer from "./components/footer/Footer";
import Bar from "./components/bar/Bar";
import ProductDetail from "./pages/product/ProductDetail";
import ShopCart from "./pages/shopcart/ShopCart";

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
                <Route path="/cart" element={<ShopCart/>}/>
                <Route path="/account" element={<Account/>}/>
            </Routes>
        </main>

        <Footer/>
    </>
  )
}

export default App
