import React from 'react';
import { PiCirclesThreePlusBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import Sidebar from './../Sidebar/Sidebar';


const Profile_Avater = ({  PhotoUrl, name, isOnline }) => {

    return (
        <div className="h-16 border-2 px-2 flex justify-between items-center">
            <div className="flex justify-center items-center">
                <Link to='/' className='lg:hidden'><IoMdArrowRoundBack className='text-3xl text-center pr-2' /></Link>
                {PhotoUrl ? (
                    <img
                        src={PhotoUrl}
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
                        {name || "Guest"}
                    </p>
                    {
                        isOnline ? <p className='text-lg font-mono text-green-900 opacity-75'>online</p> : <p className='text-lg opacity-75 font-mono text-red-700'>Offline</p>
                    }
                </div>
            </div>
            <div className='px-2'>
                <PiCirclesThreePlusBold className='text-3xl hover:text-red-400' />

            </div>
        </div>
    );
};

export default Profile_Avater;