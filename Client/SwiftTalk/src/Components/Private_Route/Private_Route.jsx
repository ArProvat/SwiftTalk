import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Private_Route = ({children}) => {
const navigate = useNavigate()

useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/login'); 
    }
}, [localStorage.getItem('token')]);


if (localStorage.getItem('token')) {
    return children;
}

    return (
        <div>
            
        </div>
    );
};

export default Private_Route;