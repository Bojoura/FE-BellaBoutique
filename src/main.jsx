import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {ShopCartProvider} from "./contexts/ShopCartContext";
import {AuthContextProvider} from "./contexts/AuthenticationContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <ShopCartProvider>
                    <App />
                </ShopCartProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
)
