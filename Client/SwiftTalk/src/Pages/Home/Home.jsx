import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { addUser, setToken } from '../../redux/UserRedux';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((state) => state.user);
    const location = useLocation();

    useEffect(() => {
        const userDataFetch = async () => {
            try {
               
                const response = await axios.get('http://localhost:8000/api/user', {
                    withCredentials: true,
                });
                if (response.data.result.logout) {
                    dispatch(setToken(null)); 
                    localStorage.removeItem('token'); 
                    navigate('/login'); 
                } else {
                    dispatch(addUser(response.data.result));

                }
            } catch (error) {
                console.error('Error fetching user data:', error.response?.data || error.message);

                if (error.response?.status === 401) {
                    dispatch(setToken(null));
                    localStorage.removeItem('token');
                  
                }
            }
        };

        userDataFetch();
    }, []);

    return (
        <div className="h-screen grid md:grid-cols-7 bg-zinc-950">
        <section className="col-span-2  h-full ">
            <Sidebar />
        </section>
        <section className="col-span-5 bg-slate-100 h-full overflow-y-auto">
            <Outlet/>
        </section>
    
</div>
    );
};

export default Home;
