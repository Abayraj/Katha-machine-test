// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosInstanceData } from '../service/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [call, setCall] = useState(false);

 

    useEffect(() => {
        const fetchUserData = async () => {
           

        
                try {
                    const response = await axiosInstanceData.get('/user/profile', {
                    });
            
                    setUser(response.data.user);
                } catch (error) {
                  
                    setUser(null);
          
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
        localStorage.removeItem('authToken');
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, trigger }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


