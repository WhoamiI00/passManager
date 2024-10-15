import React from 'react'
import { FaGithub } from "react-icons/fa";
import { useState } from 'react';
const Navbar = () => {
    const [navVisible] = useState(false);
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-2xl text-white"><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></div>
                <ul className={`flex flex-col md:flex-row ${navVisible ? 'block' : 'hidden'} md:block`}>
                    <li className='flex gap-4'>
                        <a href='/'>Home</a>
                        <a href='#'>About</a>
                        <a href='#'>Contact</a>
                    </li>
                </ul>
                <a href='https://github.com'><button className='text-white my-5 px-9 gap-4'>
                <FaGithub className='text-4xl' color='#319151'/>
                </button></a>
            </div>
        </nav>
    )
} 

export default Navbar