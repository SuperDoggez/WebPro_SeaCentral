import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
interface StateConfirmationProps {
  booking_id: number;
  
}

export const StateConfirmation: FC<StateConfirmationProps> = ({
  booking_id,
}) => {
  return(
    <>
      <div className='flex w-screen h-screen justify-start items-center flex-col '>
        <div className="flex pt-24 flex-col justify-center items-center">
          <Icon icon="fluent-mdl2:completed" color="#00FF00" width="60" height="60" />
          <div className='flex justify-center items-center text-6xl pt-16'>
            จองห้องพักสำเร็จ
          </div>
          <div className='flex justify-center items-center text-3xl pt-16'>
            สามารถตรวจสอบสถานะการจองห้องพักและข้อมูลต่าง ๆ ได้จาก
          </div>
          <div className='flex justify-center items-center text-6xl pt-24'>
            Booking ID: {booking_id}
          </div>
          <div className='flex justify-center items-center text-3xl pt-24'>
            หรือตรวจสอบที่อีเมล์ที่ท่านได้ลงทะเบียนไว้
          </div>
          <Link 
          href={`/bookingcheck/${booking_id}`}
          className='flex justify-center items-center text-lg py-2 px-4 rounded-full w-fit border-2 bg-white border-dark1 mt-16'>
            ตรวจสอบสถานะการจอง
          </Link>
          <Link 
          href="/" className='flex justify-center items-center text-lg py-2 px-4 rounded-full w-fit border-2 text-white bg-dark1 border-dark1 mt-4'>
            กลับสู่หน้าหลัก
          </Link>
        </div>


      </div>

    </>
  )
}

