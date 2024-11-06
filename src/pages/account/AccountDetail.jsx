import "./AccountDetail.css.css";
import { useAuth } from "/src/contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AccountDetail = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/AccountDetail", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                });
                setProfile(response.data);
            } catch (err) {
                setError("Kan de profielgegevens niet ophalen.");
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Profielpagina</h2>
                {error && <p className="error">{error}</p>}
                {profile ? (
                    <div className="profile-details">
                        <p><strong>Naam:</strong> {profile.name}</p>
                        <p><strong>Emailadres:</strong> {profile.email}</p>
                        <button className="login-button" onClick={handleLogout}>Uitloggen</button>
                    </div>
                ) : (
                    <p>Profielgegevens laden...</p>
                )}
            </div>
        </div>
    );
};

export default AccountDetail;
