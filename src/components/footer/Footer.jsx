import './Footer.css';
import PropTypes from "prop-types";

const Footer = ({ year, companyName, text }) => {
    return (
        <footer className="footer">
            <p>{`© ${year} ${companyName}. ${text}`}</p>
        </footer>
    );
};

Footer.propTypes = {
    year: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Footer;
