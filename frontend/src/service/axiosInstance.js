import axios from 'axios';


const baseURL = import.meta.env.VITE_BASE_URL_BACK_END;

export const axiosInstanceData = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json', 
         'Accept': 'application/json'
    }
});

const token = localStorage.getItem('authToken');
if (token) {
  axiosInstanceData.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}