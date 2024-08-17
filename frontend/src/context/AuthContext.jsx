// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosInstanceData } from '../service/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [call,setCall] = useState(false);

    console.log(user,"userrrr")

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            console.log('Retrieved token:', token); // Check if token is retrieved

            if (token) {
                try {
                    const response = await axiosInstanceData.get('/user/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('API response:', response.data); // Check API response
                    setUser(response.data.user);
                } catch (error) {
                    console.log('Failed to fetch user data:', error);
                    setUser(null);
                }
            } else {
                setUser(null); // Token not found
            }
            setLoading(false);
        };

        fetchUserData();
    }, [call]);

    const trigger = () => {
        setCall(prev => !prev);
        console.log(call);
    }
    
    const logout = () => {
        console.log("calledd")
        localStorage.removeItem('authToken');
        setUser(null); // Update the context state to reflect that the user is logged out
    };

    return (
        <AuthContext.Provider value={{ user, loading,logout,trigger}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


