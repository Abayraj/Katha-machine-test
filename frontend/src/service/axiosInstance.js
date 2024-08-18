import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL_BACK_END;

export const axiosInstanceData = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    

    }
});


axiosInstanceData.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// axiosInstanceData.interceptors.response.use(
//   (response) => {
//       return response;
//   },
//   (error) => {
//       if (error.response && error.response.status === 401) {
//           console.log('Token expired or unauthorized. Redirecting to login...');
//         //   window.location.href = '/login'; // Redirect to login page
//       }
//       return Promise.reject(error);
//   }
// );


