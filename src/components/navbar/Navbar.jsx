import {NavLink} from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";
import {useState} from "react";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className="scroll">
            <ul className="nav-left">
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/">Home</NavLink>
                </li>
                <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                         to="/product">Producten</NavLink>
            </ul>

            <div className="logo">
                <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                         to="/">
                    <img src={Logo} alt="Company logo"/>
                </NavLink>
            </div>

            <ul className="nav-right">
                <div className="search">
                    <form action="">
                        <input type="text" name="search" id="search" placeholder="Waar ben je naar op zoek?"/>
                    </form>
                </div>

                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/account">Account
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/cart">Winkelwagen
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;