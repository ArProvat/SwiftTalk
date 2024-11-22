import React from 'react';
import logo from '../../assets/Logo_swiftTalk.jpg';
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { RxAvatar } from "react-icons/rx";
import { MdOutlineEditNote } from "react-icons/md";


const Sidebar = () => {
    const Selector = useSelector((state) => state.user);

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
                    <TbLogout2 className="text-3xl text-white" />
                </div>
            </div>

            {/* Middle Content */}
            <div className="flex-1 overflow-y-auto">
                <p className="text-center text-gray-500 py-4">Conector</p>
            </div>

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
                            aria-hidden="true"
                        />
                    )}

                  
                    <p className="text-xl font-semibold text-white mx-3">
                        {Selector?.username || "Guest"}
                    </p>
                </div>
<div className='h-12 w-12 rounded-full hover:border hover:border-[rgb(172,29,36)] flex justify-center items-center '>
<MdOutlineEditNote className='text-4xl text-white'></MdOutlineEditNote>
</div>
            </div>
        </div>
    );
};

export default Sidebar;
