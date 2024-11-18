import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { addUser, setToken } from '../../redux/UserRedux';
import { consumeCollection } from './../../../node_modules/reselect/src/autotrackMemoize/tracking';

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.user)
    console.log(selector)
    useEffect( () => {
        try {
          const userDataFetch=async()=>{ 
             const response = await axios.get('http://localhost:8000/api/user')
            console.log(response.data)
            dispatch(addUser(response.data));
            if (!response.data.logout) {
                dispatch(setToken());
                navigate('/login');
            }}
            userDataFetch();
            return ()=>{}

        } catch (error) {
            console.error(error);
        }
    }, [])
    return (
        <div className='text-orange-600 text-3xl'>
            this is Home
            <Outlet></Outlet>
        </div>
    );
};

export default Home;