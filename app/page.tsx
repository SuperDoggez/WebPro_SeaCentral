'use client'
import { useState } from 'react';
import Navbar from "@/Components/Navbar";
import CalendarPicker from "@/Components/CalendarPicker";
import { getIndex, getRoom, getActivity } from '@/lib/supabase'


export default function Home() {

  return (

    <>
      <Navbar />
      <div className="flex justify-center w-screen h-screen">
        <div className="flex justify-center items-center w-full h-3/4 flex-col bg-cover bg-center  bg-no-repeat" style={{backgroundImage: `url(${getIndex(`index1`)})`}}>
          <p className="text-white font-bold text-4xl drop-shadow-xl ">Lost in Paradise at</p>
          <p className="text-white font-bold text-6xl drop-shadow-xl p-8">Sea Central Hotel</p>
          <div className="flex w-full justify-center">
            <div className="absolute w-4/6 h-1/6">

            <CalendarPicker />
            </div>
          </div>
        </div>



      </div>
    </>
  );
}
