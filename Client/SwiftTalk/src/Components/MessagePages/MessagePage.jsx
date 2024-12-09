import React, { useEffect, useState } from 'react';
import Slidebar from '../Sidebar/Sidebar';
import Header from '../../Pages/Header/Header';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile_Avater from '../Profile_Avater/Profile_Avater';

import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";





const MessagePage = () => {
    const params = useParams()
    const SocketConnection = useSelector((state) => state.user.SocketConnection)
    const user = useSelector((state) => state.user);
    const [UserDetails, SetUserDetails] = useState({
        User_id: '',
        name: '',
        email: '',
        photo: '',
        online: false,
    })

    useEffect(() => {
        if (SocketConnection) {

            SocketConnection.emit('message_page', params.userId)
            SocketConnection.on('message_user', (data) => {
                SetUserDetails(data)
            })
        }
    }, [SocketConnection, params?.userId,user])
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Top Header Section */}
            <div className=" shadow-md  ">
                <Profile_Avater User_id={UserDetails.User_id} PhotoUrl={UserDetails.photo} name={UserDetails.name} isOnline={UserDetails.online} />
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">

            </div>

            <div className="bg-white p-4 flex items-center space-x-2">
                <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    name= 'fileInput'
                />
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-gray-600 hover:text-blue-500"
                >
                    <div title='Attachment' className='flex justify-center items-center w-10 h-10 rounded-full bg-slate-200 '><GrAttachment size={25}></GrAttachment></div>

                </label>

                
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-grow bg-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />


                <button
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"

                >
                    <FiSend size={25}></FiSend>
                </button>
            </div>
        </div>

    );
};

export default MessagePage;
