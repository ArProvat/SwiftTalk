import React from 'react';
import logo from '../../assets/Logo_swiftTalk.jpg';
import { Link } from "react-router-dom";
const Navbar = () => {
  const navList = <>
    <li><a>Privacy</a></li>
    <li>
      <a>Feature</a>
      
    </li>
    <li><a>Help Center</a></li>
  </>
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
           {
            navList
           }
          </ul>
        </div>
        <img className='h-12 w-52 rounded-md' src={logo} alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navList}
        </ul>
      </div>
      <div className="navbar-end">
        <Link to='/login' className="btn font-bold text-[rgb(172,29,36)]">Register/Login</Link>
      </div>
    </div>
  );
};

export default Navbar;