import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from '../Pages/Login/Login'
import Register from "../Pages/Register/Register";
import Layout from "../layout/Layout";
import MessagePage from "../Components/MessagePages/MessagePage";
import Private_Route from "../Components/Private_Route/Private_Route";
import LandingPage from "../Pages/Landing_page/Landing_page";
import FeaturesPage from "../Pages/feature/Feature";

const router = createBrowserRouter(
    [{
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path:'',
                element:<LandingPage></LandingPage>
            },
            {
                path:'feature',
                element:<FeaturesPage/>
            },
            {
                path: 'login',
                element: <Login></Login>
            }, {
                path: 'register',
                element: <Register></Register>
            }]},
        
             {   path: "/home",
        element: <Private_Route><Home></Home></Private_Route>,
        children: [
            {
                path: ':userId',
                element: <Private_Route><MessagePage /></Private_Route>
            }
        ]
            }

        
    
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
})

export default router;