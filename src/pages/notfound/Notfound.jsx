import './Notfound.css';
import {Link} from "react-router-dom";

const Notfound = () => {
    return (
        <div>
            <h1>Page could not be found...</h1>
            <Link to="/">Home</Link>
        </div>
    );
};

export default Notfound;