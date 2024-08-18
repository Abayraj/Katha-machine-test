
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './Routes'
import { Suspense } from 'react'
import { RiseLoader } from 'react-spinners';

function App() {

  return (
 
    <Suspense fallback={
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f0f0f0'
      }}>
          <RiseLoader color="#3498db" size={20} margin={3} />
      </div>
  }>
       <RouterProvider router={router} />
  </Suspense>

  );
}

export default App
