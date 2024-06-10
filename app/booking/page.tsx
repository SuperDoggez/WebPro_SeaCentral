'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Icon } from '@iconify/react'
import { getIndex, getRoom, getActivity } from '@/lib/supabase'

export default function Booking() {
  const searchParams = useSearchParams()

  const checkInDate = searchParams.get('checkInDate')
  const checkOutDate = searchParams.get('checkOutDate')
  const adult = searchParams.get('adult')
  const children = searchParams.get('children')

  console.log(checkInDate, checkOutDate, adult, children, "From booking page")

  return (
    <div className='flex h-screen w-screen justify-start items-center flex-col bg-gray-100'>
      <div className="flex w-full h-1/6 bg-blue-400 justify-center">
        <p className='flex w-2/12 font-bold justify-center items-center text-xl text-white'>Sea Central Hotel</p>
        <p className='flex w-8/12 font-bold justify-center items-center text-5xl text-white '>กรุณาเลือกรูปแบบการจอง</p>
        <p className='flex w-2/12 font-bold justify-center items-center text-2xl text-white '></p>
      </div>
      <div className="flex w-full h-full flex-col items-center pt-8">
        <div className="flex w-10/12 h-1/6 bg-white drop-shadow-xl">


          <div className='flex w-1/3 h-full justify-around items-center'>
            <p className='flex text-2xl flex-row items-center'>
              <Icon icon="carbon:event-schedule" width="50" height="50" className='mr-8'/>
              Check In
            </p>
            <p className='text-2xl '>{checkInDate}</p>
          </div>


          <div className='flex w-1/3 h-full justify-around items-center'>
            <p className='flex text-2xl flex-row items-center'>
              <Icon icon="carbon:event-schedule" width="50" height="50" className='mr-8'/>
              Check Out 
            </p>
            <p className='text-2xl '>{checkOutDate}</p>
          </div>
          <div className="flex w-1/3 h-full flex-col justify-center items-center">
            <p className='text-2xl flex h-1/2 w-full justify-start items-center ml-'>
              <Icon icon="formkit:people" width="30" className='mr-8'/>
              Adults: {adult}
            </p>
            <p className='text-2xl flex h-1/2 w-full justify-start items-center'>
            <Icon icon="mingcute:baby-line" width="30" className='mr-8'/>
              Childrens: {children}
            </p>

          </div>
          
        </div>

        <div className="flex w-full h-full justify-center gap-52 items-center">
          <Link 
          href={`/booking/package?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`}
          className="flex bg-white flex-col shadow-lg w-2/12 h-120 min-w-96 hover:drop-shadow-xl transform duration-300 hover:scale-105 cursor-pointer">
            <div className="flex w-full h-4/6 bg-cover bg-center" style={{backgroundImage: `url(${getIndex(`index4`)})`}} />
              <div className="flex w-full h-2/6 flex-col justify-start items-center ">
                <div className="flex w-full font-bold text-3xl justify-center items-center pt-8">
                  จองแบบ Package
                </div>

                <div className="flex w-full justify-center items-center pt-6">
                  รับราคาสุดพิเศษ เมื่อจองในรูปแบบ Package
                </div>
                
                <div className="flex w-full flex-row justify-end items-end mt-8 pr-4">
                  ดำเนินการจองแบบ Package
                  <Icon icon="ep:arrow-right-bold" width="20" className='ml-2'/>
                </div>
            </div>  
          </Link>

          <Link
          href={`/booking/room?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`} 
          className="flex bg-white shadow-lg w-2/12 h-120 min-w-96 flex-col hover:drop-shadow-xl transform duration-300 hover:scale-105 cursor-pointer">
            <div className="flex w-full h-4/6 bg-cover bg-center" style={{backgroundImage: `url(${getIndex(`index3`)})`}} />

            <div className="flex w-full h-2/6 flex-col justify-start items-center ">
              <div className="flex w-full font-bold text-3xl justify-center items-center pt-8">
                เลือกห้องพักด้วยตนเอง
              </div>

              <div className="flex w-full justify-center items-center pt-6">
                เลือกห้องที่ต้องการ และเลือกซื้อ Activities ในราคาพิเศษ
              </div>
              
              <div className="flex w-full flex-row justify-end items-end mt-8 pr-4">
                ดำเนินการจองด้วยตนเอง
                <Icon icon="ep:arrow-right-bold" width="20" className='ml-2'/>
              </div>
              
            </div>
          </Link>

          
        </div>
      </div>
    </div>
    
  )
}