import { createBrowserRouter } from "react-router-dom"
import React,{lazy} from "react";




const Home = lazy(() => import('./pages/Home/Home'));
const AdminPanel = lazy(() => import('./pages/AdminPanel/AdminPanel'));
const EditData = lazy(() => import('./pages/AdminPanel/EditData'));
const AddNews = lazy(() => import('./pages/AdminPanel/AddNews'));
const SignUp = lazy(() => import('./pages/AuthPages/SignUp'));
const Login = lazy(() => import('./pages/AuthPages/Login'));
const ResetPassword = lazy(()=> import("./pages/AuthPages/ResetPassword"));
const Error = lazy (()=> import("./pages/Home/Error404"));
const  ProtectedRoute = lazy(()=> import("./service/Protected.jsx"));
const ErrorPage = lazy(()=>import("./pages/ErrorPage"));


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/admin",
        element: <ProtectedRoute element={AdminPanel} roles={['admin']} />
    },
    {
        path: "/api/get/:id",
        element: <ProtectedRoute element={EditData} roles={['admin']} />
    },
    {
        path: "/addnews",
        element: <ProtectedRoute element={AddNews} roles={['admin']} />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/reset-password",
        element: <ResetPassword />
    },
    {
        path: "*",
        element: <Error/>
    },
    {
        path:"/error",
        element:<ErrorPage/>
    }
   

])


export default router;