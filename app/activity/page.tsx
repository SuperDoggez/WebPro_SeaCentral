'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { getIndex, getRoom, getActivity } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import Navbar from '@/Components/Navbar'
import axios from 'axios'
import { Icon } from '@iconify/react'
import Footer from '@/Components/Footer'

interface Activity {
  id: number;
  name: string;
  price: number;
  description: string;  
  per_person: string;
  start: string;
  end: string;
}

export default function page () {

    const [activityData, setActivityData] = useState<Activity | null>(null);
    const [id, setId] = useState<number>(0);


    useEffect(() => {
        const fetchRoomType = async () => {
          try {
            const response = await axios.get(`/api/activity`)
            const activityId = Number(id+1);
            const activity = response.data.activity.find((activity: any) => activity.id === activityId);
            setActivityData(activity)
            console.log(activity, "activity")

          } catch {
            console.log('error')
          }
        }
        fetchRoomType()
      },[id])

      if (!activityData) {
        return <div>Loading...</div>
      }
  return (
    <>
        
        <div className='flex w-screen h-full flex-col overflow-auto'>
          <Navbar />
            <div className="flex w-screen justify-end items-center h-full min-h-96 flex-col bg-cover bg-center"
             style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${getIndex(`activity_cover`)})`}}
            >
              <p className="flex text-white text-6xl font-bold drop-shadow-xl mb-28">Hotel's Activities</p>
            </div>
        </div>


        <div className='flex w-screen h-full flex-col justify-center items-center mb-20'>
          <div className="flex w-11/12 h-32 bg-cover bg-bottom mt-8 justify-center items-center shadow-xl"
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${getIndex('activity_cover')})`}}>
            <div className="absolute font-thin text-5xl text-white drop-shadow-xl">
              Special Offer: Discount 20%
            </div>
          </div>
          <div className="flex w-9/12 drop-shadow-xl min-h-24 bg-white mt-16">
            <div 
            onClick={() => setId(0)}
            className='flex w-1/4 justify-center items-center font-bold text-2xl cursor-pointer  hover:bg-slate-100 transform duration-300 '>
              Surf Board
            </div>


            <div 
            onClick={() => setId(1)}
            className='flex w-1/4 justify-center items-center font-bold text-2xl cursor-pointer hover:bg-slate-100 transform duration-300 '>
              Diving Tour
            </div>


            <div 
            onClick={() => setId(2)}
            className='flex w-1/4 justify-center items-center font-bold text-2xl cursor-pointer hover:bg-slate-100 transform duration-300 '>
              Water Ski
            </div>


            <div 
            onClick={() => setId(3)}
            className='flex w-1/4 justify-center items-center font-bold text-2xl cursor-pointer hover:bg-slate-100 transform duration-300 '>
              Sunset Private Boat
            </div>
          </div>

          <div className="flex w-11/12 min-h-128 h-full mt-16 justify-center">

            <div className="flex w-4/12 h-128 flex-col justify-center items-center  drop-shadow-xl bg-white">
              <div className="flex w-full h-full flex-col bg-cover bg-center"
              style={{backgroundImage: `url(${getActivity(`${id+1}`)})`}} />
              
            </div>

          <div className="flex w-24 " />
            <div className="flex w-6/12 min-h-128 h-full bg-white drop-shadow-xl flex-col items-center">
              <div className="flex w-full font-thin h-full text-6xl flex-col pt-8 justify-center items-center">
                {activityData?.name}
              </div>
              <div className="flex w-full h-full text-3xl lex-col pt-8 justify-center items-center ">
                Service : {activityData?.start} - {activityData?.end}
              </div>
              <div className="flex w-full text-center  h-1/6 flex-col pt-16 justify-center items-center">
                <div className="text-2xl font-bold">
                  {activityData?.price} ฿
                </div>
                <div className="text-xl font-thin">
                  / {activityData?.per_person}
                {

                  activityData.id === 1 ? " board" : 
                  activityData.id === 2 ? " people" : 
                  activityData.id === 3 ? " round per person" : " hours"

                }
                </div>
                
              </div>
              <div className="flex w-3/4 h-full text-xl flex-col pt-16 justify-center items-center border-b pb-8 border-gray-400">
                {activityData?.description}
              </div>
              
            </div>
          </div>

          
        </div>

        <Footer/> 


    </>
  )
}
