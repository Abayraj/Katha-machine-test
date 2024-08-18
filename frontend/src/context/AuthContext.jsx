import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosInstanceData } from '../service/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('authToken'));


    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const response = await axiosInstanceData.get('/user/profile');
                    setUser(response.data.user);
                } catch (error) {
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

  


    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



