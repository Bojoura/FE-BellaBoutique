import {useNavigate} from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";
import {useState} from "react";
import CustomNavLink from "./CustomNavLink.jsx";
import AccessibleImage from "../AccessibleImage.jsx";
import CustomForm from "./CustomForm.jsx";

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