'use client'
import React, { useState } from 'react'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { DatePicker, InputGroup, InputNumber, Stack } from 'rsuite';
import Link from 'next/link';

export const CalendarPicker: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [valueAdults, setValueAdults] = useState<number>(0);
  const [valueChildren, setValueChildren] = useState<number>(0);

  const handleMinus = () => {
    if (valueAdults > 0) {
      setValueAdults(valueAdults - 1);
    }
  };

  const handlePlus = () => {
    setValueAdults(valueAdults + 1);
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
    if (valueChildren > 0) {
      setValueChildren(valueChildren - 1);
    }
  };

  const handlePlusChildren = () => {
    setValueChildren(valueChildren + 1);
  };

 
  return (
    <>
        <div className="flex flex-col w-full h-full bg-black mt-40">
            <div className="flex w-full h-2/3 bg-white">
              <div className="flex justify-center items-center w-2/5"> 
                <DatePicker 
                  placeholder = "Select Check In Date"
                  oneTap
                  format="yyyy-MM-dd"
                  onChange={handleCheckIn}
                /> 

              </div>

              <div className="flex justify-center items-center w-2/5"> 
                <DatePicker 
                  placeholder = "Select Check Out Date"
                  oneTap
                  format="yyyy-MM-dd"
                  onChange={handleCheckOut}
                /> 
              </div>

              <div className="flex flex-col justify-center w-1/5"> 
                <div className="flex w-full h-1/2 justify-center items-center">
                  Adults
                  <Stack direction="column" alignItems="flex-start" spacing={10}>
                    <InputGroup>
                      <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
                      <InputNumber className='hidden' value={valueAdults} onChange={setValueAdults} scrollable={false}/>
                      <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
                    </InputGroup>
                  </Stack>
                </div>
                <div className="flex w-full h-1/2 justify-center items-center">  
                Childrens
                <Stack direction="column" alignItems="flex-start" spacing={10}>
                    <InputGroup>
                      <InputGroup.Button onClick={handleMinusChildren}>-</InputGroup.Button>
                      <InputNumber className='hidden' value={valueChildren} onChange={setValueChildren} scrollable={false}/>
                      <InputGroup.Button onClick={handlePlusChildren}>+</InputGroup.Button>
                    </InputGroup>
                </Stack>
                </div>
                  
              </div>
              
            </div>
            <div className="flex w-full h-1/3 bg-orange">
              <div className='flex font-bold w-2/3 justify-center items-center text-xl bg-slate-400'>
                  จองห้องพัก
                </div>
                
                <Link href={`/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&valueAdults=${valueAdults}&valueChildren=${valueChildren}`}
                  className='flex font-bold w-1/3 justify-center items-center text-xl'>
                  จองห้องพัก
                </Link>
            </div>
        </div>
    </>
  )
}

export default CalendarPicker   
