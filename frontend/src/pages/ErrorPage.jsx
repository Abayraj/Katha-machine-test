import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.error || 'An unexpected error occurred.';
 

  return (
    
      <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
              <svg className="w-40 h-40 mx-auto text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
              </svg>
              <h1 className="text-6xl font-bold text-gray-800">someting went wrong</h1>
              <p className="text-xl text-gray-600 mt-4">Sorry, we couldn't find what you were looking for please try again contact support.</p>
              <p className="text-lg text-gray-500 mt-2">{errorMessage}</p>
              <a href="/" className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg text-lg font-semibold">Go Back Home</a>
          </div>
      </div>

  );
}

export default ErrorPage;

