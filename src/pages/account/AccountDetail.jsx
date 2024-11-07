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

    const handleLogout = () => {
        logout();
        navigate("/");
    };

//submit call using native formData api
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)

        axios.put(`http://localhost:8080/users/${user.email}`, {data: formData}).then((res) => {
            console.log(res);
            //reload so that authcontext can get new data
            window.location.reload();
        });
    }

//keep file in state so we can show the name of the file to user that is uploading
    const handleFileChange = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

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
                                <input type="text" name="name" defaultValue={user.name}/>
                                <p><strong>Emailadres:</strong> {user.email}</p>
                                <input id="file" type="file" name="photo" onChange={handleFileChange}/>
                                {file && <p>Bestandsnaam: {file.name}</p>}
                                <input type="submit" value="Verzenden"/>
                            </form>
                        ) : (
                            <>
                                {user.photo &&
                                    <div className="profile-image-wrapper">
                                        <img className="profile-image" src={user.photo} alt="profile photo"/>
                                    </div>
                                }
                                <p><strong>Naam:</strong> {user.name}</p>
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