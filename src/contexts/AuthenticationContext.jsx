import {createContext, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import checkTokenValidation from "../helpers/CheckTokenValidation";

const AuthContext = createContext({
    isAuth: false,
    user: null,
    login: () => {},
    logout: () => {},
    status: 'pending',
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) =>{
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (storedToken && checkTokenValidation(storedToken)) {
            void login(storedToken);
        } else {
            logout(false);
        }
    }, []);

    const login = async (jwt) => {
        try {
            const decodedToken = (jwtDecode(jwt));
            localStorage.setItem('jwt', jwt);

            const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });

            const userData = {
                name: response.data.username,
                email: response.data.email,
                authority: response.data.authority,
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
    }

    const logout= (redirect = true) => {
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
    }

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