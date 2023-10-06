import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Auth = ({ element }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                removeCookie('jwt')
                navigate('/login');
            } else {
                try {
                    // Verify the user's authentication status on the server
                    const response = await axios.post(`${window.react_app_url}auth`, {}, { withCredentials: true });
                    const data = response.data;
                    if (!data.status) {
                        removeCookie('jwt')
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('Authentication error:', error);
                    removeCookie('jwt')
                    navigate('/login');
                }
            }
        };
        verifyUser();
    }, [cookies, navigate]);

    return element;
};

const AuthGuard = ({ element }) => {
    const [cookies] = useCookies(['jwt']);
  
    // Check if the user is logged in
    const isLoggedIn = !!cookies.jwt;
  
    return isLoggedIn ? <Navigate to="/" /> : element;
};

export { Auth, AuthGuard }; 
