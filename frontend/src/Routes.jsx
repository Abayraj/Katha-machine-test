import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminPanel from "./pages/AdminPanel/AdminPanel";


const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"admin",
        element:<AdminPanel/>
    }
])


export default router;