'use client'
import React from 'react'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { DatePicker } from 'rsuite';

export const CalendarPicker = () => {
  return (
    <>
        <div className="flex flex-col w-full h-full bg-black mt-40">
            <div className="flex w-full h-2/3 bg-white">
              <div className="flex justify-center items-center w-2/5"> 
                <DatePicker 
                  placeholder = "Select Check in Date"
                  oneTap
                /> 

              </div>

              <div className="flex justify-center items-center w-2/5"> 
                <DatePicker 
                  placeholder = "Select Check in Date"
                  oneTap
                /> 
              </div>

              <div className="flex flex-col justify-center w-1/5"> 
                <div className="flex w-full h-1/2 justify-center items-center">1</div>
                <div className="flex w-full h-1/2 justify-center items-center">1</div>
                  
              </div>
              
            </div>
            <div className="flex w-full h-1/3 bg-black">
                2
            </div>
        </div>
    </>
  )
}

export default CalendarPicker   
