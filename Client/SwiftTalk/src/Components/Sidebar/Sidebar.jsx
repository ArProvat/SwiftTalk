import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/Logo_swiftTalk.jpg';
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { RxAvatar } from "react-icons/rx";
import { MdOutlineEditNote } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import SearchPerson from '../SearchPerson/SearchPerson';
import { logout, setToken } from '../../redux/UserRedux'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Profile_Avater from '../Profile_Avater/Profile_Avater';


const Sidebar = () => {
    const Selector = useSelector((state) => state.user);
    const SocketConnection = useSelector((state) => state.user.SocketConnection);
    const UserEndRef = useRef(null);

    const [openSearch, setopenSearch] = useState(false);
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [AllUsers, setAllUsers] = useState([])
    const scrollToBottom = () => {
            UserEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };
    
        useEffect(() => {
            scrollToBottom();
        }, [AllUsers]);
    useEffect(() => {
        if (SocketConnection) {
            console.log(selector)
            SocketConnection.emit('sidebar', selector.user_id)
            SocketConnection.on('conversation', (data) => {
                console.log('conversation', data);
                const conversationUserdata = data.map((conversation) => {
                    if (conversation.receiver._id !== selector.user_id) {
                        return {
                            ...conversation,
                            userDetails: conversation.receiver

                        }
                    }
                    else {
                        return {
                            ...conversation,
                            userDetails: conversation.sender
                        }
                    }

                })
                setAllUsers(conversationUserdata)
            })

        }
    }, [SocketConnection, selector])
    console.log('alluser', AllUsers)
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
            if (response.data.status === 200) {
                localStorage.clear();
                dispatch(logout())
                dispatch(setToken(null));
                navigate('/login');
                console.log(response)
            }
        }
        catch (err) {

        }
    }

    return (
        <div className="px-3 py-2 h-screen flex flex-col justify-between">
            {/* Header */}
            <div className="h-14 border-b flex justify-between items-center border-gray-200">
                <img
                    src={logo}
                    alt="SwiftTalk Logo"
                    className="h-12 w-36 rounded-md"
                />
                <div
                    title="Logout"
                    className="h-10 w-10 rounded-full border flex justify-center items-center hover:bg-red-600 border-red-600 cursor-pointer"
                >
                    <TbLogout2 onClick={handleLogout} className="text-3xl text-white" />
                </div>
            </div>

            {/* Middle Content */}
            <div className="flex-1 overflow-y-auto">
                < div className='flex py-2 justify-between items-center'>
                    <h3 className='text-2xl text-white font-semibold '>Messages</h3>
                    < IoMdPersonAdd onClick={() => setopenSearch(true)} title='Add person' className='text-3xl text-white hover:cursor-pointer' />
                </div>
                {
                    AllUsers.map(conversationData => {
                        return (
                            <Link to={'/' + conversationData.userDetails._id}
                                key={conversationData.userDetails._id}>
                                <div className="flex h-14 items-center gap-1 mx-1 mt-2 rounded-xl bg-slate-200 px-4 py-2  hover:ring-2 focus:ring-2 hover:ring-blue-500">
                                    {conversationData.userDetails.photoUrl ? (
                                        <img
                                            src={conversationData.userDetails.photoUrl}
                                            alt="Profile photo"
                                            className="h-12 w-12 rounded-full"
                                        />
                                    ) : (
                                        <RxAvatar
                                            className="h-12 w-12"

                                        />
                                    )}



                                    <div className='flex flex-col text-ellipsis justify-center mx-3'>
                                        <p className="text-2xl font-sans font-semibold ">
                                            {conversationData.userDetails.name || "Guest"}
                                        </p>

                                        {
                                            conversationData.lastMessage.text ? (<p className='text-xs line-clamp-1'>{conversationData.lastMessage.text}</p>)
                                                : (<p className='text-xs text-ellipsis line-clamp-1'>send a Attachment</p>)
                                        }


                                    </div>

                                    {
                                        conversationData.countUnseen > 0 && <p className='ml-auto' >{conversationData.countUnseen}</p>
                                    }

                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div ref={UserEndRef} />


            {/* Footer */}
            <div className="h-14 border-t flex justify-between items-center">
                <div className="flex justify-center items-center">
                    {Selector?.PhotoUrl ? (
                        <img
                            src={Selector.PhotoUrl}
                            alt="Profile photo"
                            className="h-11 w-12 rounded-full hover:translate-x-1"
                        />
                    ) : (
                        <RxAvatar
                            className="h-12 w-12"

                        />
                    )}


                    <p className="text-xl font-semibold text-white mx-3">
                        {Selector?.username || "Guest"}
                    </p>
                </div>
                <div className='h-10 w-10 rounded-full hover:border hover:border-[rgb(172,29,36)] flex justify-center items-center '>
                    <MdOutlineEditNote className='text-4xl text-white'></MdOutlineEditNote>
                </div>
            </div>
            {
                openSearch && <SearchPerson isOpen={() => { setopenSearch(false) }} />
            }
        </div>
    );
};

export default Sidebar;
