import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-wrapper">
            <div className="contact-container">
                <h2>Contact en Locatie</h2>
                <div className="contact-info">
                    <div className="info-section">
                        <h3>Ons Adres</h3>
                        <p>Newtonlaan 247, 3584 BH Utrecht</p>
                    </div>
                    <div className="info-section">
                        <h3>Telefoonnummer</h3>
                        <p>+31 (0)30 307 3200 </p>
                    </div>
                    <div className="info-section">
                        <h3>Emailadres</h3>
                        <p>bella@test.nl</p>
                    </div>
                    <div className="info-section">
                        <h3>Openingstijden</h3>
                        <p>Ma - Vr: 09:00 - 18:00</p>
                        <p>Za: 10:00 - 17:00</p>
                        <p>Zo: Gesloten</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
