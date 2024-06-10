import React from 'react'
import Link from 'next/link'
import { getIndex } from '@/lib/supabase'

export default function Navbar() {
  return (
    <div className='absolute font-bitter w-full h-28 from-MainBlue to-transparent backdrop-blur-lg bg-gradient-to-b'>
        <div className="flex justify-center h-full">
            <div className="flex justify-around items-center w-11/12 h-full">
                <div className="flex justify-around w-5/12">
                    <Link href='/' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>หน้าหลัก</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='/room' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>ประเภทห้องพัก</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='/#pri' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>สิทธิพิเศษ</Link>
                </div>
                <div className="flex justify-center w-2/12">
                <img src={getIndex(`logo`)} width="90px" className='mt-2'></img>
                </div>
                <div className="flex justify-around w-5/12">
                    <Link href='/' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>จองห้องพัก</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='/activity' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>กิจกรรมของเรา</Link>
                    <p className='flex text-white text-xl font-bold drop-shadow-xl'>|</p>
                    <Link href='/#footer' className='flex text-white font-bold text-lg drop-shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>ติดต่อเรา</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

