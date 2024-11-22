import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import logo from "../../assets/Logo_swiftTalk.jpg"


const Header = () => {
    const selector = useSelector((state) => state.user)
    return (
        <div className='h-12 flex flex-row justify-between mx-2 '>
            <div className='flex justify-center items-center'>
            <img className='h-10 w-52  rounded-md' src={logo} alt="" />
            </div>
            <div className='flex justify-center items-center gap-1'>
                <Link to='/login' className='text-sm flex justify-center items-center w-16 rounded-md border hover:bg-[rgb(172,29,36)] hover:text-white'>Logout</Link>
               <div>
               {
                    selector.PhotoUrl ? <img src={selector.PhotoUrl} alt="" className='h-8 w-8 rounded-full'/> : <RxAvatar className='h-8 w-8' />
                }
               </div>
            </div>
        </div>
    );
};

export default Header;