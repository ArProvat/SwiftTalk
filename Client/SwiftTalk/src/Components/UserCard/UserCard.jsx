import React from 'react';

const UserCard = ({user}) => {
    return (
        <div className='flex justify-center items-center flex-col'>
            <img src={user.photoUrl} alt="" className='h-10 w-10 rounded-full'/>
            <p>{user.username}</p>
        </div>
    );
};

export default UserCard;