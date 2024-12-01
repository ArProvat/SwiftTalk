import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Register from './../Register/Register';
import { useDispatch } from 'react-redux';
import { addUser, setToken } from '../../redux/UserRedux';

const Login = () => {
    const { register, handleSubmit, reset } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', data, {
                withCredentials: true,
            })

            console.log(response.data)
            toast.success(response.data.message, {
                position: 'top-right',
                duration: 3000
            })
            if (response.data.success) {
                dispatch(setToken(response.data.token));
                localStorage.setItem('token', response.data.token);
                navigate('/');
                reset();
            }
        } catch (error) {
            toast.error('login failed ' + error.response?.data.message, {
                position: 'top-right',
                duration: 3000
            });
        }
    }
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center  lg:text-left">
                            <h1 className='text-6xl  font-bold text-[rgb(172,29,36)]'>Welcome to SwiftTalk...</h1>
                            <h1 className="text-5xl font-bold"> Login now!</h1>
                           <p className='py-6'>
Connect with your friend and family to get started with SwiftTalk
                           </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"{...register('email', { required: true })} placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register('password', { required: true, minLength: 6 })} placeholder="Password" className="input input-bordered" required />
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <label className=''>
                                    <p  className="label-text-alt ">You don't have any account yet? <Link to='/register' className='underline hover:text-blue-600'> Register now</Link> </p>
                                </label>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster></Toaster>
        </div>
    );
};

export default Login;