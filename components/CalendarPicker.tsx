'use client'
import React, { useState } from 'react'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Button, DatePicker, InputGroup, InputNumber, Stack } from 'rsuite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { stat } from 'fs';


export const CalendarPicker: React.FC = () => {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [adult, setValueAdults] = useState<number>(0);
  const [children, setValueChildren] = useState<number>(0);
  const [statePage, setStatePage] = useState<number>(0);
  const [defaultValue, setDefaultValue] = useState<string>('');

  const SearchSubmit = async () => {
    if (statePage === 1) {
      router.push(`/bookingcheck/${defaultValue}/`)
    }
    else if (statePage === 0) {
      setStatePage(1)
    }
 }

 console.log(defaultValue, "defaultValue")

 type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
   const handleChange: changeHandler = (e) => {
      setDefaultValue(e.target.value);
   }

  const handleMinus = () => {
    if (adult > 0) {
      setValueAdults(adult - 1);
    }
  };

  const handlePlus = () => {
    setValueAdults(adult + 1);
  };

  const handleCheckIn = (date: Date | null) => {
    if (date === null) return;
    const resetDate = date.toISOString().split('T')[0];
    setCheckInDate(resetDate)
  }

  const handleCheckOut = (date: Date | null) => {
    if (date === null) return;
    const resetDate = date.toISOString().split('T')[0];
    setCheckOutDate(resetDate)
  }

  const handleMinusChildren = () => {
    if (children > 0) {
      setValueChildren(children - 1);
    }
  };

  const handlePlusChildren = () => {
    setValueChildren(children + 1);
  };

  const BookingHandler = () => {
    if (statePage === 0) {
      router.push(`/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`)
    }
    else if (statePage === 1) {
      setStatePage(0)
    }
  }
  return (
    <>
   
        <div className="flex flex-col w-full h-56 bg-white">
        {statePage === 0 && 
            <div className="flex w-full h-2/3 bg-white ">
              <div className="flex justify-center items-center w-2/5 gap-8 border-r border-gray-300"> 
                <Icon icon="carbon:calendar" width="32"/>
                <p className='text-xl'>Check In</p>
                  
                  <DatePicker 
                  className='w-1/2 '
                    placeholder = "Select Check In Date"
                    oneTap
                    format="yyyy-MM-dd"
                    onChange={handleCheckIn}
                  /> 

              </div>

              <div className="flex justify-center items-center w-2/5 gap-8 border-r border-gray-300"> 
                <Icon icon="carbon:calendar" width="32"/>
                <p className='text-xl'>Check Out</p>
                <DatePicker 
                  placeholder = "Select Check Out Date"
                  oneTap
                  format="yyyy-MM-dd"
                  onChange={handleCheckOut}
                /> 
              </div>

              <div className="flex flex-col justify-center w-1/5"> 
                <div className="flex w-full h-1/2 justify-center items-center gap-4">
                  <Icon icon="formkit:people" width="32"/>
                  <p className='text-xl'>Adults</p>
                    <Icon icon="ic:baseline-minus" onClick={handleMinus}/>
                      <input className='w-12 h-12 text-center'  value={adult} onChange={(value) => setValueAdults(Number(value))}/>
                    <Icon icon="ic:baseline-plus" onClick={handlePlus}/>
                </div>
                <div className="flex w-full h-1/2 justify-center items-center">  
                    <Icon icon="mingcute:baby-line" width="32"/>
                    <p className='text-xl'>Childrens</p>
                    <Icon icon="ic:baseline-minus" onClick={handleMinusChildren}/>
                    <input className='w-12 h-12 text-center'  value={children} onChange={(value) => setValueAdults(Number(value))}/>
                    <Icon icon="ic:baseline-plus" onClick={handlePlusChildren}/>
                </div>
                  
              </div>
              
            </div>
            }



            {statePage === 1 && 

            <div 
            className="flex w-8/12 xl:w-full h-full bg-gray-100">
              <div className="flex justify-center w-full items-center flex-col drop-shadow-xl">
                <input 
                  value={defaultValue}
                  onChange={handleChange}
                  type="search" 
                  id="search" 
                  className="block rounded-3xl w-8/12 p-4 text-lg text-gray-900 " placeholder="ระบุหมายเลขการจองเพื่อเช็คสถานะการจองห้องพัก" required />
              </div>
            </div>

                
            }
            <div className="flex w-full h-1/3 bg-orange">
              <div 
                onClick={SearchSubmit}
                className='flex font-bold w-1/3 justify-center items-center text-xl bg-slate-400'>
                  เช็คสถานะการจอง
                </div>
                
                  <button 
                  onClick={BookingHandler}
                  disabled={statePage === 0 && (checkInDate === '' || checkOutDate === '' || adult === 0)}
                  className='flex font-bold w-2/3 justify-center items-center text-xl'>
                    จองห้องพัก
                  </button>
            </div>
        </div>
    </>
  )
}

export default CalendarPicker   
