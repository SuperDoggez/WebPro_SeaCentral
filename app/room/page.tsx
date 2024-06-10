'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Link  from 'next/link'
import { getIndex, getRoom, getActivity } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import Navbar from '@/Components/Navbar'
import axios from 'axios'
import { Icon } from '@iconify/react'
import Footer from '@/Components/Footer'
interface Room {
  id: number;
  name: string;
  price: number;
  description: string;  
  per_person: string;
  start: string;
  end: string;
}

export default function page () {

  const [roomData, setRoomData] = useState<Room[]>([]);



    useEffect(() => {
        const fetchRoomType = async () => {
          try {
            const response = await axios.get(`/api/room`)
            const roomData = response.data.room
            setRoomData(roomData)
          } catch {
            console.log('error')
          }
        }
        fetchRoomType()
      },[])

    if (!roomData) {
      return <div>Loading...</div>
    }

  return (
    <>
        
        <div className='flex w-screen h-full flex-col overflow-auto'>
          <Navbar />
            <div className="flex w-screen justify-end items-center h-full min-h-96 flex-col bg-cover bg-center"
             style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${getIndex(`index7`)})`}}
            >
              <p className="flex text-white text-6xl font-bold drop-shadow-xl mb-24">ห้องพักของเรา</p>
            </div>
        </div>
        <div className="flex flex-row w-full justify-around pt-16 pb-16">
        {roomData.map((room) => (
        <Link
          href={`/roominfo/${room.id}`}
          key="room"
          className="flex bg-white shadow-lg w-2/12 h-100 min-w-96 flex-col hover:drop-shadow-xl transform duration-300 hover:scale-105 cursor-pointer">
            <div className="flex w-full h-4/6 bg-cover bg-center" style={{backgroundImage: `url(${getRoom(`${room.id}`)})`}} />

            <div className="flex w-full h-2/6 max-h-24 flex-col justify-start items-center ">
              <div className="flex w-full font-bold text-3xl justify-center items-center pt-8">
                {room.name}
              </div>

              <div className="flex w-full justify-center items-center pt-6">
                {room.description.slice(0, 45)}
              </div>
              
              <div className="flex w-full flex-row justify-end items-end mt-8 pr-4">
                ดูเพิ่มเติม
                <Icon icon="ep:arrow-right-bold" width="20" className='ml-2'/>
              </div>
              
            </div>
          </Link>
          ))}
          
          </div>
          <Footer />



    </>
  )
}
