import "./AccountDetail.css";
import {useAuth} from "/src/contexts/AuthenticationContext";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosHeaders as Buffer} from "axios";
import Button from "../../components/buttons/Button.jsx";

const AccountDetail = () => {
    const {user, logout, status} = useAuth();
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [message, setMessage] = useState("");
    const [photo, setPhoto] = useState(null);
    console.log(previewUrl);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        if (file) {
            formData.append("photo", file);
        }

        const jwt = localStorage.getItem("jwt");

        try {
            const response =
                await axios.put(`http://localhost:8080/users/${user.email}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log(response);
            void fetchPhoto(response.data.photoUrl)
            // setPhoto(response.data.photoUrl)
            setMessage("Profiel succesvol bijgewerkt!");
        } catch (error) {
            console.error("Fout bij het uploaden:", error);
            setMessage("Er is een fout opgetreden. Probeer het opnieuw.");
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith("image/")) {
                alert("Selecteer een geldig afbeeldingsbestand.");
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert("Het bestand is te groot. Maximaal 5 MB toegestaan.");
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const fetchPhoto = async (photoEndpoint) => {
        const jwt = localStorage.getItem("jwt");

        try {
            const response = await axios.get(`http://localhost:8080${photoEndpoint}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                responseType: 'blob',
            });

            const imageUrl = URL.createObjectURL(response.data);

            setPhoto(imageUrl);
            setIsEditable(!isEditable);
        } catch (err) {
            console.error(err);
        }
    };

    if (!user || status === "pending") return <p>Profielgegevens laden...</p>;
    if (status === "error") return <p>Er is een fout opgetreden bij het ophalen van de gegevens.</p>;

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
                                {previewUrl && !photo && (
                                    <div>
                                        <label>Voorbeeld:</label>
                                        <img src={previewUrl} alt="Voorbeeld van de geselecteerde afbeelding"
                                             className="image-preview"/>
                                    </div>
                                )}
                                {console.log(previewUrl)}
                                {message && <p>{message}</p>}
                                <input type="submit" value="Opslaan"/>
                            </form>
                        ) : (
                            <>
                                <div className="profile-image-wrapper">
                                    <img
                                        className="profile-image"
                                        src={photo || user.photoUrl}
                                        alt="Profielfoto"
                                        key={photo || user.photoUrl}
                                    />
                                </div>

                                <p><strong>Naam:</strong> {user.username}</p>
                                <p><strong>Emailadres:</strong> {user.email}</p>
                                <Button className="login-button" onClick={() => setIsEditable(!isEditable)}>Profiel
                                    aanpassen</Button>
                                <Button className="login-button" onClick={handleLogout}>Uitloggen</Button>
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