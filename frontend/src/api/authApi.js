
import { axiosInstanceData } from "../service/axiosInstance";

export const handleSubmitSignUp = async (values)=>{
    try{
        const response = await axiosInstanceData.post('/signup', values);

        console.log(response)

        return response.data.message;
        
    }
    catch(error){
        console.log(error.response.data.error)

        return error.response.data.error
    }

}

export const handleSubmitLogin = async (values) => {
    try {
        const response = await axiosInstanceData.post('/login', values);
        const token = response.data.token;

        if (token) {
            localStorage.setItem('authToken', token);
            axiosInstanceData.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return response.data;
    } catch (error) {
        console.error('Error in handleSubmitLogin:', error);
        return error.response?.data;
    }
};


export const handleForgotPassword = async (values) => {
    try {
        const response = await axiosInstanceData.post('/request-password-reset', values, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        return error.response?.data || 'An error occurred';
    }
};


export  const handleSubmitNewPassword = async (values) =>{

     try {
        const response = await axiosInstanceData.post('/reset-password',values);
        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        return error.response?.data || 'An error occurred';
    }

}


