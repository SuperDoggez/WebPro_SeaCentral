'use client'
import * as React from 'react';
import Navbar from "@/components/navbar";
import CalendarPicker from "@/components/CalendarPicker";

export default function Home() {

  return (
    // <img src="https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/b-trade/profile/43474571-17aa-4c70-bf6c-960848a25ed4.jpg" alt="" />
    <>
      <Navbar />
      <div className="flex justify-center w-screen h-screen">
        <div className="flex justify-center items-center w-full h-3/4 flex-col bg-cover bg-bottom bg-no-repeat" style={{backgroundImage: "url('https://media.discordapp.net/attachments/701337773969375253/1240637564071710790/pexels-asadphoto-1268871.jpg?ex=66474945&is=6645f7c5&hm=a81cd27711fce1c3e363803c8906df455aefed551afe91fbc4d190751097dae7&=&format=webp&width=1410&height=796')"}}>
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
