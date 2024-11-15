import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const Register = () => {
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
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="Name" placeholder="Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Password" className="input input-bordered" required />

                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='profile_pic'>Photo

                                        <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                                            <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                                                Upload profile photo
                                            </p>
                                        </div>
                                    </label>
                                    <input
                                        type='file'
                                        id='profile_pic'
                                        name='profile_pic'
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