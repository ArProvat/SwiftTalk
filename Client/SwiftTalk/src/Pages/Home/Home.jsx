import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='text-orange-600 text-3xl'>
            this is Home
            <Outlet></Outlet>
        </div>
    );
};

export default Home;