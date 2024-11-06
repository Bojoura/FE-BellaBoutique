import {createContext, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import checkTokenValidation from "../helpers/CheckTokenValidation";

const AuthContext = createContext(
    // isAuth: false,
    // user: null,
    // login: () => {},
    // logout: () => {},
);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) =>{
    const [auth, setAuth] = useState({
        isAuth: false,
        user: '',
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (storedToken && checkTokenValidation(storedToken)) {
            void login(storedToken);
        } else {
            void logout();
        }
    }, []);

    const login = async (jwt) => {
        const decodedToken = (jwtDecode(jwt));
        console.log(decodedToken);
        localStorage.setItem('jwt', jwt);
        try {
            const response = await axios.get(`http://localhost:8080/users/?username=${decodedToken.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    authority: response.data.authority,
                },
                status: 'done',
            });
        } catch (error) {
            alert(error);
        }
    }

    function logout(redirect = true) {
        setAuth({
            ...auth,
            isAuth: false,
            user: '',
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
    };
    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}