import React from 'react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className='absolute  w-full h-28 bg-gradient-to-b from-MainBlue to-transparent'>
        <div className="flex justify-center h-full">
            <div className="flex justify-around items-center w-11/12 h-full">
                <div className="flex justify-around w-5/12">
                    <Link href='#' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>หน้าหลัก</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='#' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>ประเภทห้องพัก</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='#' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>สิ่งอำนวยความสะดวก</Link>
                </div>
                <div className="flex justify-center w-2/12">
                    
                </div>
                <div className="flex justify-around w-5/12">
                    <Link href='#' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>จองห้องพัก</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='#' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>กิจกรรมของเรา</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='#' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>ติดต่อเรา</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
