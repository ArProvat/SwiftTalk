import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({user,IsOpen}) => {
    const [active ,setActive] =useState(false)
    return (
          <Link to={`/${user._id}`} onClick={IsOpen} >
      <div onClick={()=>setActive(!active)}  className={`flex   mx-3 border-t-2 ${active&& 'border-2 border-blue-600'} border-slate-200 rounded-md hover:bg-gray-100 items-center`}>
            <img src={user.photoUrl} alt="" className='h-12 w-12 rounded-full'/>
          <div className='p-3 leading-none '>
            <p className='text-lg font-semibold'>{user.name}</p>
            <p className='text-md text-black opacity-50'>{user.email}</p>
          </div>
        </div>
    
           </Link>
    );
};

export default UserCard;