import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import UploadFile from './../../Helper/UploadFile';

const Register = () => {
    const {
        register, handleSubmit, setValue, watch
    } = useForm();
    const [UploadedFile, setUploadedFile] = useState('');

    const onSubmit = async(data) => {
        console.log(data);

      try {
        const response=await axios.post('http://localhost:8000/api/register',data)
        toast(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
       /* if(response.data.success === true){
        e.target.reset()
        
      }*/
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.message || error.message);
      }
    
    };

    const handleFileUpload =async (e) => {
        const file = e.target.files[0];
        setUploadedFile(file);
        const UploadFileInCloudinary=await UploadFile(file)
        console.log(UploadFileInCloudinary)
        setValue('photoUrl',file );
    };

    const handleCleanFileUpload = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setUploadedFile(null);
        setValue('photoUrl', null); 
    };

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className='text-6xl font-bold text-[rgb(172,29,36)]'>Welcome to SwiftTalk...</h1>
                            <h1 className="text-5xl font-bold"> Register now!</h1>
                            <p className="py-6">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text"
                                        {...register('name', { required: true })}
                                        placeholder="Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"
                                        {...register('email', { required: true, pattern: /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/ })}
                                        placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Password"
                                        {...register('password', {
                                            required: true, minLength: 6
                                        })}
                                        className="input input-bordered" required />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='profile_pic'>Photo

                                        <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
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
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
