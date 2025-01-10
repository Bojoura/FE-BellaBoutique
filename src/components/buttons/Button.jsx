import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ to, type = 'button', children, className, ...rest }) => {
    return to ? (
        <Link to={to}>
            <button type={type} className={`button ${className || ''}`} {...rest}>
                {children}
            </button>
        </Link>
    ) : (
        <button type={type} className={`button ${className || ''}`} {...rest}>
            {children}
        </button>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    type: 'button',
};

export default Button;
