import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from '../Pages/Login/Login'
import Register from "../Pages/Register/Register";
import App from "../App";
import MessagePage from "../Components/MessagePages/MessagePage";
import Private_Route from "../Components/Private_Route/Private_Route";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'login',
                element: <Login></Login>
            }, {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: "",
                element: <Home></Home>,
                children: [
                    {
                        path: ':userId',
                        element: <MessagePage />
                    }
                ]
            }

        ]
    }
],{
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }})

export default router;