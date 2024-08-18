import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosInstanceData } from '../service/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [call, setCall] = useState(false);

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
    }, [token, call]);

  

    const callUserDetails = () => {
        setCall(prev => !prev);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user,loading, logout,callUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



