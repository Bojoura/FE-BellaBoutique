import "./AccountDetail.css";
import { useAuth } from "/src/contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const AccountDetail = () => {
    const {user,logout, status} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (status === 'pending') return <p>Profielgegevens laden...</p>;

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Profielpagina</h2>
                {user ? (
                    <div className="profile-details">
                        <p><strong>Naam:</strong> {user.name}</p>
                        <p><strong>Emailadres:</strong> {user.email}</p>
                        <button className="login-button" onClick={handleLogout}>Uitloggen</button>
                    </div>
                ) : (
                    <p>Geen profielgegevens gevonden.</p>
                )}
            </div>
        </div>
    );
};

export default AccountDetail;
