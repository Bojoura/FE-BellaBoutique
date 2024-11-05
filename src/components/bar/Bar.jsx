import './Bar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const Bar = () => (
    <div className="bar-container">
        <div className="bar">
            <div className="list">
                {["Verzending binnen 2 werkdagen",
                    "Gratis verzending vanaf € 75,00",
                    "Niet goed? Geld terug binnen 3 werkdagen"].map((text, index) => (
                    <div key={index} className="item">
                        <FontAwesomeIcon icon={faCheck} />
                        {text}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Bar;