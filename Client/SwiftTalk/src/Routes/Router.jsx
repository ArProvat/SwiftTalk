import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from '../Pages/Login/Login'
import Register from "../Pages/Register/Register";
import App from "../App";
import MessagePage from "../Components/MessagePages/MessagePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            }, {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/',
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
])

export default router;