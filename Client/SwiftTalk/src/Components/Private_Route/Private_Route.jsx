import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Private_Route = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
console.log(token);
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]); 

  return token ? children : null; 
}
export default Private_Route;
