'use client'
import React, { useState } from 'react'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { DatePicker, InputGroup, InputNumber, Stack } from 'rsuite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export const CalendarPicker: React.FC = () => {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [adult, setValueAdults] = useState<number>(0);
  const [children, setValueChildren] = useState<number>(0);
  const [statePage, setStatePage] = useState<number>(0);
  const [defaultValue, setDefaultValue] = useState<string>('');

  const SearchSubmit = async () => {
    try{
       router.push(`/bookingcheck/${defaultValue}/`)
    }catch{
       console.log(Error)
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

 
  return (
    <>
   
        <div className="flex flex-col w-full h-full bg-black mt-40">
        {statePage === 0 && 
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
                      <InputNumber className='hidden' value={adult} onChange={setValueAdults} scrollable={false}/>
                      <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
                    </InputGroup>
                  </Stack>
                </div>
                <div className="flex w-full h-1/2 justify-center items-center">  
                Childrens
                <Stack direction="column" alignItems="flex-start" spacing={10}>
                    <InputGroup>
                      <InputGroup.Button onClick={handleMinusChildren}>-</InputGroup.Button>
                      <InputNumber className='hidden' value={children} onChange={setValueChildren} scrollable={false}/>
                      <InputGroup.Button onClick={handlePlusChildren}>+</InputGroup.Button>
                    </InputGroup>
                </Stack>
                </div>
                  
              </div>
              
            </div>
            }



            {statePage === 1 && 
              <div className="flex justify-center items-center flex-col">
                <input 
                  value={defaultValue}
                  onChange={handleChange}
                  type="search" 
                  id="search" 
                  className="block rounded-3xl w-full p-4 text-lg text-gray-900 " placeholder="ระบุหมายเลขการจองเพื่อเช็คสถานะการจองห้องพัก" required />
                <button 
                  onClick={SearchSubmit} 
                  className="flex text-white end-2.5 mt-8 bottom-1.5 bg-dark1 hover:bg-dark2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-xl px-14 py-2 md:absolute">ค้นหา</button>
              </div>
                
                
            }
            <div className="flex w-full h-1/3 bg-orange">
              <div 
                onClick={() => setStatePage(1)}
                className='flex font-bold w-1/3 justify-center items-center text-xl bg-slate-400'>
                  เช็คสถานะการจอง
                </div>
                
                <Link href={`/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`}
                  className='flex font-bold w-2/3 justify-center items-center text-xl'>
                  จองห้องพัก
                </Link>
            </div>
        </div>
    </>
  )
}

export default CalendarPicker   
