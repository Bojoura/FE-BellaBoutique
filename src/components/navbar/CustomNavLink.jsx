import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const CustomNavLink = ({page, label, children}) => {
    return (
            <li>
                <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                         to={page}>{label}
                    {children}
                </NavLink>
            </li>
    );
};

CustomNavLink.propTypes = {
    page: PropTypes.string.isRequired,
    label: PropTypes.string,
    children: PropTypes.element,
};

export default CustomNavLink;