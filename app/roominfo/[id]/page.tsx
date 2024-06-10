'use client'
import React from 'react'
import { useParams } from 'next/navigation'
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
  swimming_pool: boolean;
  bath_tub: boolean;
  twin_bed: number;
  double_bed: number;

}

export default function page () {
    const { id } = useParams();
    const [roomData, setRoomData] = useState<Room | null>(null);


    useEffect(() => {
        const fetchRoomType = async () => {
          try {
            const response = await axios.get(`/api/room`)
            const roomId = Number(id);
            const room = response.data.room.find((room: any) => room.id === roomId);
            setRoomData(room)

          } catch {
            console.log('error')
          }
        }
        fetchRoomType()
      },[id])

      if (!roomData) {
        return <div>Loading...</div>
      }
  return (
    <>
        
        <div className='flex w-screen h-full flex-col overflow-auto'>
          <Navbar />
            <div className="flex w-screen justify-end items-center h-full min-h-128 flex-col bg-cover bg-center"
             style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${getRoom(`${id}`)})`}}
            >
              <p className="flex text-white text-6xl font-bold drop-shadow-xl mb-8">{roomData.name}</p>
              <p className="flex text-white text-2xl font-normal drop-shadow-xl mb-8">{roomData.price} ฿ / 1 day</p>
              <p className="flex text-white text-2xl font-normal drop-shadow-xl mb-28">
                {roomData.twin_bed &&
                <>{roomData.twin_bed} {roomData.twin_bed === 1 ? 'Twin Bed' : 'Twin Beds'}</>}
                &nbsp;|&nbsp;
                {roomData.double_bed &&
                <>{roomData.double_bed} {roomData.double_bed === 1 ? 'Double Bed' : 'Double Beds'}</>
                }
              </p>
            </div>

            <div className="flex w-full h-full justify-center items-center pt-32 flex-col">
              <div className='flex text-center h-52 w-3/4 justify-center font-center text-2xl font-bold'>{roomData.description}</div>
              <div className="flex w-full justify-around items-center mt-16 mb-16">

                {roomData.swimming_pool &&
                <div className="flex flex-col w-1/3 justify-center items-center pt-4">
                  <Icon icon="mdi:pool" width="128"/>
                  <p className="flex text-2xl font-bold pt-8">สระว่ายน้ำส่วนตัวสุดหรู</p>
                </div>
                }

                {roomData.bath_tub &&
                <div className="flex flex-col w-1/3 justify-center items-center pt-4">
                  <Icon icon="solar:bath-bold" width="128"/>
                  <p className="flex text-2xl font-bold pt-8">อ่างอาบน้ำขนาดใหญ่</p>
                </div>
                }

                <div className="flex flex-col w-1/3 justify-center items-center pt-4">
                  <Icon icon="healthicons:award-trophy-outline" width="128"/>
                  <p className="flex text-2xl font-bold pt-8">รางวัลโรงแรมยอดเยี่ยมแห่งปี</p>
                </div>
                <div className="flex flex-col w-1/3 justify-center items-center pt-4">
                  <Icon icon="carbon:review" width="128"/>
                  <p className="flex text-2xl font-bold pt-8">คะแนนรีวิวสูงที่สุดในหาดยาว</p>
                </div>
                
              </div>
            </div>
        </div>
        <Footer />
    </>
  )
}
