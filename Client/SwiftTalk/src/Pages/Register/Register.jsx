import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import UploadFile from './../../Helper/UploadFile';
import { Upload } from 'lucide-react';

const Register = () => {
    const {
        register, handleSubmit, setValue, watch
    } = useForm();
    const navigate = useNavigate()
    const [UploadedFile, setUploadedFile] = useState('');

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const response = await axios.post('http://localhost:8000/api/register', data)
            if (response.success) {
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 3000
                })
                navigate('/login')
            }
            /* if(response.data.success === true){
             e.target.reset()
             
           }*/
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: 'top-right',
                duration: 3000
            });
            navigate('/login')
        }

    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setUploadedFile(file);
        const UploadFileInCloudinary = await UploadFile(file)

        setValue('photoUrl', UploadFileInCloudinary.url);
    };

    const handleCleanFileUpload = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setUploadedFile(null);
        setValue('photoUrl', null);
    };

    return (
        <div className="min-h-screen adient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Welcome content */}
                <div className="space-y-6 text-center lg:text-left animate-slide-in-left">
                    <div className="space-y-2">
                        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Welcome to SwiftTalk
                        </h1>
                        <h2 className="text-2xl lg:text-4xl font-bold text-base-content">Register now!
                            </h2>
                    </div>
                    <p className="text-lg text-base-content/70 max-w-md mx-auto lg:mx-0">
                        Join our community and start connecting with friends and family instantly. Experience the future of communication today.

                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <div className="badge badge-outline px-3 py-3 text-sm">⚡ Instant Access</div>
                        <div className="badge badge-outline px-3 py-3 text-sm">💬 Real-time Chat</div>
                        <div className="badge badge-outline px-3 py-3 text-sm">📱 Multi-device Sync</div>
                    </div>
                </div>

                {/* Right side - Login form */}
                <div className="card w-full max-w-md mx-auto border-2 border-white/20 shadow-2xl bg-base-100 animate-slide-in-right">
                    <div className="card-body">
                        <div className="text-center  ">
                            <h2 className="text-2xl font-bold text-base-content">Create Account</h2>
                            <p className="text-base-content/70">
                                Enter your details to get started</p>
                        </div>

                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Name</span>
                                </label>
                                <input type="text"
                                    {...register('name', { required: true })}
                                    placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Email</span>
                                </label>
                                <input type="email"
                                    {...register('email', { required: true, pattern: /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/ })}
                                    placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Password</span>
                                </label>
                                <input type="password" placeholder="Password"
                                    {...register('password', {
                                        required: true, minLength: 6
                                    })}
                                    className="input input-bordered" required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='profile_pic' >
                                    <span className='text-base-content '>Profile photo</span>

                                    <div className='h-14 mt-2 flex-col text-center  border border-dotted rounded hover:border-primary hover:text-primary cursor-pointer'>
                                        <Upload className='m-auto text-center flex justify-center items-center '></Upload>
                                        <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                                            {
                                                UploadedFile?.name ?
                                                    UploadedFile?.name.length > 30 ?
                                                        UploadedFile?.name.slice(0, 30) + ' ...' : UploadedFile?.name :
                                                    'Upload profile photo'
                                            }  {
                                                UploadedFile?.name &&
                                                <button className='text-xl ml-2 text-center hover:text-red-600' onClick={handleCleanFileUpload}><MdCancel /></button>
                                            }

                                        </p>
                                    </div>
                                </label>
                                <input
                                    type='file'
                                    id='profile_pic'
                                    name='photoUrl'
                                    {...register('photoUrl')}
                                    onChange={handleFileUpload}
                                    className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                                />
                            </div>
                            <p className='text-md mt-2'>You already have an account?<Link to='/login' className='underline hover:text-blue-600'>login now</Link> </p>
                            <div className="form-control mt-6">
                                <button className="btn w-full btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Register;
