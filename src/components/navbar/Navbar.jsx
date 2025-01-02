import "./Navbar.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import CustomNavLink from "./CustomNavLink.jsx";
import AccessibleImage from "../accessible-image/AccessibleImage.jsx";
import CustomForm from "./CustomForm.jsx";
import Logo from "../../assets/Logo.png";


const Navbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/product?search=${search}`);
    }

    return (
        <nav className="navbar">
            <ul className="nav-left">
                    <CustomNavLink page={"/"} label={"Home"} />
                    <CustomNavLink page={"/product"} label={"Producten"} />
                    <CustomNavLink page={"/cart"} label={"Winkelwagen"} />
            </ul>

            <div className="logo">
                <CustomNavLink page={"/"} label={""}>
                    <AccessibleImage src={Logo} alt={"Company logo"} />
                </CustomNavLink>
            </div>

            <ul className="nav-right">
                <CustomForm onChange={setSearch} onSubmit={onSubmit} value={search} placeholder={"Zoeken..."} name={"search"} id={"search"}/>
                <CustomNavLink page={"/account"} label={"Account"} />
                <CustomNavLink page={"/contact"} label={"Contact"} />
            </ul>
        </nav>
    );
};

export default Navbar;