import PropTypes from "prop-types";

const CustomInput = ({ onChange, value, placeholder, name, id }) => {
    return (
        <input
            type="text"
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

CustomInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default CustomInput;
