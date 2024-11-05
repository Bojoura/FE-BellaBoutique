import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import Account from "./pages/account/Account.jsx";
import Product from "./pages/product/Product.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Notfound from "./pages/notfound/Notfound.jsx";

function App() {
  return (
    <>
        <header>
            <Navbar/>
        </header>

        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="*" element={<Notfound/>}/>
            </Routes>
        </main>

    </>
  )
}

export default App
