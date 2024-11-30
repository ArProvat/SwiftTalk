import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoSearchOutline } from "react-icons/io5";
import UserCard from '../UserCard/UserCard';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from "react-icons/im";


const SearchPerson = ({ isOpen }) => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [SearchValue, setSearchValue] = useState('');


    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8000/api/search',
                { search: SearchValue }
            );
            console.log(response.data.User);
            setSearchUser(response.data.User || []);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        handleSubmit();



    }, [SearchValue]);
    console.log(searchUser);
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-700 bg-opacity-40">
            <div className="w-full mx-auto flex flex-col max-w-md mt-28 lg:mt-20">

                <div className="h-12 w-full rounded-lg overflow-hidden flex bg-white">
                    <input
                        className="w-full px-4 py-2 h-full outline-none"
                        type="text"
                        placeholder="Search user by email or name"
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={SearchValue}
                    />
                    <div className="flex justify-center items-center h-14 w-14">
                        <IoSearchOutline size={25} />
                    </div>
                </div>


                <div className="mt-2 bg-white rounded-lg">
                    {loading && <p className="text-center text-zinc-500">Loading...</p>}
                    {!loading && searchUser.length === 0 && (
                        <p className="text-center text-zinc-500">No User Found</p>
                    )}
                    {!loading &&
                        searchUser.length !== 0 &&
                        searchUser.map((user) => (
                            <UserCard key={user._id} user={user} open={open} />
                        ))}
                </div>

                <div className='absolute top-10 right-12'>
                    <Link to='/' onClick={() => isOpen(false)}  ><ImCancelCircle title='Go back' className='text-2xl text-zinc-700 hover:text-zinc-950 ' /></Link>
                </div>

            </div>
            <Toaster />
        </div>
    );
};

export default SearchPerson;
