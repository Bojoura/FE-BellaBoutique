import {createContext, useEffect, useState, useCallback, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import checkTokenValidation from "../helpers/CheckTokenValidation";
import PropTypes from "prop-types";

const AuthContext = createContext({
    isAuth: false,
    user: null,
    login: () => {},
    logout: () => {},
    status: 'pending',
});
console.log(AuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) =>{
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    const logout = useCallback((redirect = true) => {
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        localStorage.removeItem('jwt');
        localStorage.removeItem('cart');
        if (redirect) {
            navigate('/');
        }
    }, [navigate]);

    const login = useCallback(async (jwt) => {
        const decodedToken = (jwtDecode(jwt));
        localStorage.setItem('jwt', jwt);
        console.log(decodedToken);
        try {
            const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                withCredentials: true
            });
            console.log(response.data);
            const userData = {
                username: response.data.username,
                email: response.data.email,
                photoUrl: response.data.photoUrl,
            };

            setAuth({
                isAuth: true,
                user: userData,
                status: 'done',
            });
        } catch (error) {
            alert('Login mislukt. Probeer het opnieuw.');
            logout(false);
        }
    }, [logout]);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (storedToken && checkTokenValidation(storedToken)) {
            void login(storedToken);
        } else {
            logout(false);
        }
    }, [login, logout]);

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
        status: auth.status
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.element.isRequired,
};

export default AuthContext;