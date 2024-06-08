'use client'
import { useState } from 'react';
import Navbar from "@/Components/Navbar";
import CalendarPicker from "@/Components/CalendarPicker";


export default function Home() {

  return (

    <>
      <Navbar />
      <div className="flex justify-center w-screen h-screen">
        <div className="flex justify-center items-center w-full h-3/4 flex-col bg-cover bg-bottom bg-no-repeat" style={{backgroundImage: "url('https://media.discordapp.net/attachments/701337773969375253/1240637564071710790/pexels-asadphoto-1268871.jpg?ex=6661a745&is=666055c5&hm=b1ba16b349958fd223c968790f9bb4319e9eb17a6b6566b04cbd92442e751bc7&=&format=webp&width=1100&height=620')"}}>
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
