import React from 'react';
import { Navigate } from 'react-router-dom';
import  {useAuth } from '../context/AuthContext';
import { RiseLoader } from 'react-spinners';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
    const { user, loading } = useAuth();
   

    if (loading) {
        return <div>
             <RiseLoader color="#3498db" size={20} margin={3} />
        </div>; 
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="*" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
