import {NavLink} from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
    const [search, setSearch] = useState('');

    return (
        <nav className="navbar">
            <ul className="nav-left">
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/">Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/product">Producten
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/cart">Winkelwagen
                    </NavLink>
                </li>
            </ul>

            <div className="logo">
                <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                         to="/">
                    <img src={Logo} alt="Company logo"/>
                </NavLink>
            </div>

            <ul className="nav-right">
                <li className="search">
                    <form>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Zoeken..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/account">Account
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/contact">Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;