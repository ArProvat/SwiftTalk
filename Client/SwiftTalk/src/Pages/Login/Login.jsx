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
                navigate('/home');
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
       
        <div className="min-h-screen adient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Welcome content */}
                <div className="space-y-6 text-center lg:text-left animate-slide-in-left">
                    <div className="space-y-2">
                        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Welcome Back to SwiftTalk
                        </h1>
                        <h2 className="text-2xl lg:text-4xl font-bold text-base-content">Login now!
                            </h2>
                    </div>
                    <p className="text-lg text-base-content/70 max-w-md mx-auto lg:mx-0">
Connect with your friends and family to get started with SwiftTalk. Your conversations are waiting for you.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <div className="badge badge-outline px-3 py-3 text-sm">⚡ Instant Access</div>
                        <div className="badge badge-outline px-3 py-3 text-sm">🔐 Secure Login</div>
                        <div className="badge badge-outline px-3 py-3 text-sm">📱 Multi-device Sync</div>
                    </div>
                </div>

                {/* Right side - Login form */}
                <div className="card w-full max-w-md mx-auto border-2 border-white/20 shadow-2xl bg-base-100 animate-slide-in-right">
                    <div className="card-body">
                        <div className="text-center  ">
                            <h2 className="text-2xl font-bold text-base-content">Welcome Back</h2>
                            <p className="text-base-content/70">
                               Sign in to your account to continue</p>
                        </div>

                         <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base-content">Email</span>
                                    </label>
                                    <input type="email"{...register('email', { required: true })} placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base-content">Password</span>
                                    </label>
                                    <input type="password" {...register('password', { required: true, minLength: 6 })} placeholder="Password" className="input input-bordered" required />
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link  link-hover text-blue-600">Forgot password?</a>
                                </label>
                                <label className=''>
                                    <p  className="label-text-alt ">You don't have any account yet? <Link to='/register' className='underline hover:text-blue-600'> Register now</Link> </p>
                                </label>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary w-full">Login</button>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
      
    );
};

export default Login;