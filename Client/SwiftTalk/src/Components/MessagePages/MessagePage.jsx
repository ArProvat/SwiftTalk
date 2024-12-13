import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile_Avater from '../Profile_Avater/Profile_Avater';
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import UploadFile from './../../Helper/UploadFile';

const MessagePage = () => {
    const params = useParams();
    const messagesEndRef = useRef(null);
    const [Messages, setMessage] = useState({
        text: '',
        fileUrl: '',
    });
    const SocketConnection = useSelector((state) => state.user.SocketConnection);
    const user = useSelector((state) => state.user);
    const [UserDetails, SetUserDetails] = useState({
        User_id: '',
        name: '',
        email: '',
        photo: '',
        online: false,
    });
    const [AllMessages, SetAllMessages] = useState([]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [AllMessages]);

    const fileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const fileResult = await UploadFile(file);
            setMessage((prev) => ({
                ...prev,
                fileUrl: fileResult
            }));
        } catch (error) {
            console.error("File upload failed:", error);
            // Optionally show a toast or error message to the user
        }
    };

    const handleOnChange = (e) => {
        setMessage(prev => ({
            ...prev,
            text: e.target.value,
        }));
    };

    useEffect(() => {
        if (SocketConnection) {
            // Fetch user details
            SocketConnection.emit('message_page', params.userId);
            SocketConnection.on('message_user', (data) => {
                SetUserDetails(data);
            });

            SocketConnection.on('message', (data) => {
                SetAllMessages(data);
            });

            
            SocketConnection.on('error', (error) => {
                console.error("Socket error:", error);
                // Optionally show error to user
            });

           
            return () => {
                SocketConnection.off('message_user');
                SocketConnection.off('message');
                SocketConnection.off('error');
            };
        }
    }, [SocketConnection, params?.userId, user]);

    const handleSendMessage = (e) => {
        e.preventDefault();


        const sendMessage = {
            sender: user?.user_id ,
            receiver: params.userId,
            text: Messages.text,
            fileUrl: Messages.fileUrl
        };
        
        if (SocketConnection) {
            SocketConnection.emit('new message', sendMessage);
            setMessage({
                text: "",
                fileUrl: ""
            });
        }
    };

    const MessageItem = ({ message, isOwnMessage }) => {
        return (
            <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div 
                    className={`
                        max-w-[70%] p-3 rounded-lg 
                        ${isOwnMessage 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-black'}
                    `}
                >
                    {message.text && <p>{message.text}</p>}
                    {message.FileUrl && (
                        <img 
                            src={message.FileUrl} 
                            alt="Attached" 
                            className="max-w-full h-auto rounded-md mt-2"
                        />
                    )}
                    <span className="text-xs block mt-1 opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="shadow-md">
                <Profile_Avater 
                    User_id={UserDetails.User_id} 
                    PhotoUrl={UserDetails.photo} 
                    name={UserDetails.name} 
                    isOnline={UserDetails.online} 
                />
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {
                    AllMessages.map((message) => (
                        <MessageItem 
                            key={message._id }
                            message={message} 
                            isOwnMessage={message.msgSendBy === user?.user_id}
                        />
                    ))
                }
               
                <div ref={messagesEndRef} />
            </div>

          
            <div className="bg-white p-4 flex items-center space-x-2">
                <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    name='fileInput'
                    onChange={fileUpload}
                />
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-gray-600 hover:text-blue-500"
                >
                    <div 
                        title='Attachment' 
                        className='flex justify-center items-center w-10 h-10 rounded-full bg-slate-200'
                    >
                        <GrAttachment size={25} />
                    </div>
                </label>

                <form onSubmit={handleSendMessage} className='flex flex-grow'>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={Messages.text}
                        onChange={handleOnChange}
                        className="flex-grow bg-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 mx-2 rounded-full hover:bg-blue-600"
                    >
                        <FiSend size={25} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessagePage;