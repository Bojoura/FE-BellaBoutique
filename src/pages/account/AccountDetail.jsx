import "./AccountDetail.css";
import { useAuth } from "/src/contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AccountDetail = () => {
    const {user, logout, status} = useAuth();
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        if (file) {
            formData.append("photo", file);
        }

        const jwt = localStorage.getItem('jwt');

        try {
             axios.put(`http://localhost:8080/users/${user.email}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${jwt}`,

                },
            }).then(() => {
                 window.location.reload();
             });


    } catch (error) {
        console.error("Fout bij het uploaden:", error);
    }
};

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    if (status === 'pending') return <p>Profielgegevens laden...</p>;

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Profielpagina</h2>
                {user ? (
                    <div className="profile-details">
                        {isEditable ? (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="">Naam</label>
                                <input type="text" name="name" defaultValue={user.username}/>
                                <p><strong>Emailadres:</strong> {user.email}</p>

                                <label htmlFor="file">Profielfoto:</label>
                                <input id="file" type="file" name="photo" onChange={handleFileChange}/>

                                {previewUrl && (
                                    <div>
                                        <label>Voorbeeld:</label>
                                        <img src={previewUrl} alt="Voorbeeld van de geselecteerde afbeelding" className="image-preview"/>
                                    </div>
                                )}

                                <input type="submit" value="Verzenden"/>
                            </form>
                        ) : (
                            <>
                                {user.userPhoto && (
                                    <div className="profile-image-wrapper">
                                        <img className="profile-image" src={`http://localhost:8080${user.photoUrl}`} alt="profile photo"/>
                                    </div>
                                    )}
                                <p><strong>Naam:</strong> {user.username}</p>
                                <p><strong>Emailadres:</strong> {user.email}</p>
                                <button className="login-button" onClick={() => setIsEditable(!isEditable)}>
                                    Profiel aanpassen
                                </button>
                                <button className="login-button" onClick={handleLogout}>Uitloggen</button>
                            </>
                        )}
                    </div>
                ) : (
                    <p>Geen profielgegevens gevonden.</p>
                )}
            </div>
        </div>
    );
};

export default AccountDetail;