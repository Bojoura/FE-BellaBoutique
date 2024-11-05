import "./Account.css";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import {useAuth} from "/src/contexts/AuthenticationContext.jsx";
import {useNavigate} from "react-router-dom";

const Account = () => {
    const [emailaddress, setEmailaddress] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {login} = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                email: emailaddress,
                password: password
            });
            if (response.status === 200) {
                await login(response.data.jwt);
                navigate('/accountdetail');
            }
        } catch (e) {
            if (e.response && e.response.status === 401) {
                setError('Password is incorrect');
            } else {
                setError('Inloggen is niet gelukt. Probeer het later opnieuw.');
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    email: emailaddress,
                    password: password,
                }),
            });

            const data = await response.text();
            if (response.ok) {
                console.log("Registratie succesvol:", data);
            } else {
                console.error("Registratie mislukt:", data);
            }
        } catch (error) {
            console.error("Er is een fout opgetreden:", error);
        }
        setName('');
        setEmailaddress('');
        setPassword('');
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="login-wrapper">
            <div className={`login-container ${isRegistering ? 'right-panel-active' : ''}`} id="container">
                <h2>{isRegistering ? 'Register' : 'Account'}</h2>
                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Emailadres:</label>
                            <input
                                type="email"
                                value={emailaddress}
                                onChange={(e) => setEmailaddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="login-button" type="submit">Registreren</button>
                        <p>Heeft u al een account, klik <span onClick={() => setIsRegistering(false)}>hier</span> om
                            in te loggen.</p>
                    </form>
                ) : (
                    <form>
                        <div className="form-group">
                            <label>Emailadres:</label>
                            <input
                                type="email"
                                value={emailaddress}
                                onChange={(e) => setEmailaddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Wachtwoord:</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="password-input"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="toggle-password-visibility"
                                >
                                    {isPasswordVisible ? <FaEyeSlash/> : <FaEye/>}
                                </button>
                            </div>
                            {error && <p className="error">{error}</p>}
                        </div>
                        <button className="login-button" type="submit" onClick={handleLogin}>Inloggen</button>
                        <p>Heeft u nog geen account, registreer dan <span
                            onClick={() => setIsRegistering(true)}>hier</span>.</p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Account;