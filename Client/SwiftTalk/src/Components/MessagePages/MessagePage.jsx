import React, { useEffect, useState } from 'react';
import Slidebar from '../Sidebar/Sidebar';
import Header from '../../Pages/Header/Header';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile_Avater from '../Profile_Avater/Profile_Avater';

const MessagePage = () => {
    const params = useParams()
    console.log(params)
    const SocketConnection = useSelector((state) => state.user.SocketConnection)
    const [UserDetails,SetUserDetails]= useState({
        User_id: '',
        name: '',
        email: '',
        photo: '',
        online:false,
    })

    useEffect(()=>{
        if(SocketConnection){

            SocketConnection.emit('message_page',params.userId)
            SocketConnection.on('message_user',(data)=>{
            SetUserDetails(data)
            })
        }
    },[SocketConnection,params?.userId])
    return (
        <div>
            <div>
                <Profile_Avater User_id={UserDetails.User_id} PhotoUrl ={UserDetails.photo} name={UserDetails.name} isOnline={UserDetails.online} />
            </div>
            <div>

            </div>
        </div>
    );
};

export default MessagePage;
