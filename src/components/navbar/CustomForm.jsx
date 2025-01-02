import PropTypes from "prop-types";

const CustomForm = ({onChange, onSubmit, value, placeholder, name, id}) => {
    return (
        <li className={id}>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </form>
        </li>
    );
}

CustomForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default CustomForm;