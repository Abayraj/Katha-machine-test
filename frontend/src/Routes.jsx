import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import EditData from "./pages/AdminPanel/EditData";


const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/admin",
        element:<AdminPanel/>
    },
    {
        path:"api/get/:id",
        element:<EditData/>
    }
])


export default router;