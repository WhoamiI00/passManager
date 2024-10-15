import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 w-full'>
        <div className="logo font-bold text-2xl text-white"><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></div>
      <div className='flex'>Created with Love<FaHeart color='pink' className='py-1 text-2xl'/> by Yours Truly!</div>
    </div>
  )
}

export default Footer
