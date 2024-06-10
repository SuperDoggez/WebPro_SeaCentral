'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import { Icon } from '@iconify/react';
import {getIndex} from '@/lib/supabase'
import Link from 'next/link'


export default function page()  {
    const { booking_id } = useParams();
    const [bookingData, setBookingData] = useState<[]>([]);
    const [roomData, setRoomData] = useState<[]>([]);
    const [roomCount, setRoomCount] = useState<[]>([]); 
    const [activitiesData, setActivitiesData] = useState<[]>([]);
    const [activitiesCount, setActivitiesCount] = useState<[]>([]);
    const [packageData, setPackageData] = useState<[]>([]);
    const [packageCount, setPackageCount] = useState<[]>([]);
    const [touristInfo, setTouristInfo] = useState<[]>([]);


    console.log(booking_id, "title")

    useEffect(() => {
        const fetchRoomType = async () => {
          try {
            const response = await axios.get(`/api/checkbooking/${booking_id}`)
            setBookingData(response.data.booking)
            setRoomData(response.data.room)
            setRoomCount(response.data.roomcount)
            setActivitiesData(response.data.activity)
            setActivitiesCount(response.data.activitycount)
            setPackageData(response.data.package_)
            setPackageCount(response.data.packagecount)
            setTouristInfo(response.data.booking.tourist_info)


            console.log(response.data, "response.data")
          } catch {
            console.log('error')
          }

        }
        fetchRoomType()
      },[])
  return (
    <div className='flex w-screen h-full items-center justify-center flex-col bg-slate-200 overflow-auto pb-16'>
      
      <div className="flex w-full h-44 flex-col text-5xl font-bold justify-center items-center text-white bg-bluebase">
        <Link href="/"><img src={getIndex('logo')} className='w-28 h-28' /></Link>
        <div>Booking: {booking_id}</div>
      </div>

      <div className="flex w-10/12 h-32 bg-white drop-shadow-xl mt-8">
        <div className='flex w-full h-full justify-around items-center'>
          <p className='text-4xl font-bold'>Status: {bookingData.status}</p>
        </div>
      </div>
      <div className="flex w-10/12 h-32 bg-white drop-shadow-xl mt-8">
        
        <div className='flex w-1/3 h-full justify-around items-center'>
          <p className='flex text-2xl flex-row items-center'>
            <Icon icon="carbon:event-schedule" width="50" height="50" className='mr-8'/>
            Check In
          </p>
          <p className='text-2xl '>{bookingData.checkin}</p>
        </div>


        <div className='flex w-1/3 h-full justify-around items-center'>
          <p className='flex text-2xl flex-row items-center'>
            <Icon icon="carbon:event-schedule" width="50" height="50" className='mr-8'/>
            Check Out 
          </p>
          <p className='text-2xl '>{bookingData.checkout}</p>
        </div>

        <div className="flex w-1/3 h-full flex-col justify-center items-center">
          <p className='text-2xl flex h-1/2 w-full justify-start items-center ml-'>
            <Icon icon="formkit:people" width="30" className='mr-8'/>
            Adults: {bookingData.adult}
          </p>
          <p className='text-2xl flex h-1/2 w-full justify-start items-center'>
          <Icon icon="mingcute:baby-line" width="30" className='mr-8'/>
            Childrens: {bookingData.children}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-5/6 h-full mt-16 bg-white justify-center items-center shadow-lg">
          <div className="flex w-full font-bold text-xl pt-24 pl-12  gap-2 items-center sm:text-3xl">
              <Icon icon="icon-park-outline:people" className="flex w-8 h-8  text-black" />
              <p className='font-normal text-grayprogress'>|</p>
              <p>ข้อมูลผู้เข้าพัก</p>
          </div>
          <div className="flex w-5/6 justify-center gap-6 items-start flex-col">
              <div className="flex w-fit  border-gray-400 justify-center items-center pt-8">
                  <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                      <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                      <input
                          value={touristInfo.first_name}
                          type="text" 
                          placeholder="ชื่อ"
                          name="first_name"
                          className="font-bold h-fit py-4 pl-5 text-grayname"
                          disabled
                      /> 
                  </div>

                  <div className="flex w-fit border-b border-gray-400 justify-center items-center ml-8">
                      <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                      <input
                          value={touristInfo.last_name}
                          type="text" 
                          placeholder="นามสกุล"
                          name="last_name"
                          className="font-bold h-fit py-4 pl-5 text-grayname"
                          disabled
                      /> 
                  </div>    
              </div>

              <div className="flex w-fit  border-gray-400 justify-center items-center">
                  <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                      <Icon icon="mingcute:phone-line" className="flex w-7 h-7  text-gray-400" />
                      <input
                          value={touristInfo.phone_number}
                          type="text" 
                          placeholder="เบอร์โทรศัพท์"
                          name="phone_number"
                          className="font-bold h-fit py-4 pl-5 text-grayname"
                          disabled
                      /> 
                  </div>
                  
                  <div className="flex w-fit border-b border-gray-400 justify-center items-center ml-8">
                      <Icon icon="mingcute:phone-line" className="flex w-7 h-7  text-gray-400" />
                      <input
                          value={touristInfo.phone_number_2}
                          type="text" 
                          placeholder="เบอร์โทรศัพท์ (สำรอง)"
                          name="phone_number_2"
                          className="font-bold h-fit py-4 pl-5 text-grayname"
                          disabled
                      /> 
                  </div>
              </div>


          </div>
          
          
          


          <div className="flex flex-col w-full h-full pl-12 pt-24 bg-white justify-center items-center">
              <div className="flex w-full font-bold text-xl pt-8  gap-2 items-center sm:text-3xl">
                  <Icon icon="ph:note" className="flex w-8 h-8  text-black" />
                  <p className='font-normal text-grayprogress'>|</p>
                  <p>คำขอพิเศษ</p>
              </div>
              <div className='w-11/12 mt-6 justify-start'>
                  สามารถขอคำขอพิเศษได้โดยทางโรงแรมจะพิจารณาเพิ่มเติมสำหรับคำขอนั้น ๆ เป็นกรณีพิเศษ
              </div>
              <div className="flex relative mb-4 w-full px-4 ">

                  <textarea
                      value={bookingData.description}
                      placeholder="คำขอเพิ่มเติม"
                      name="description"
                      className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-2 pt-1 pb2 mt-8 resize-none bg-gray-50 rounded-sm h-32"
                      disabled
                  /> 
                  
              </div>

          </div>
          <div className="flex w-full justify-center ">
            <div className="flex flex-col w-1/2 h-full pl-12 pt-24 bg-white justify-center items-center">
              <div className="flex w-full font-bold text-xl pt-8  gap-2 items-center sm:text-3xl">
                  <Icon icon="ic:twotone-bed" className="flex w-8 h-8  text-black" />
                  <p className='font-normal text-grayprogress'>|</p>
                  <p>รายการจองแบบ Package</p>
              </div>
              <div className="flex flex-col mb-4 w-full px-4 ">
                {packageData.map((room, index) => (
                  <div className="flex">
                    <div className="flex w-96 h-24 mt-8 bg-white drop-shadow-xl justify-center items-center">
                      <div className='flex text-2xl font-bold'>{room.name}</div>
                      <div className='flex text-xl ml-9'>{packageCount[index].count}</div>
                    </div>
                  </div>
                ))}

                  
              </div>

          </div>
            <div className="flex flex-col w-1/2 h-full pl-12 pt-24 bg-white justify-center items-center">
              <div className="flex w-full font-bold text-xl pt-8  gap-2 items-center sm:text-3xl">
                  <Icon icon="ic:twotone-bed" className="flex w-8 h-8  text-black" />
                  <p className='font-normal text-grayprogress'>|</p>
                  <p>รายการจองห้องพัก</p>
              </div>
              <div className="flex flex-col mb-4 w-full px-4 ">
                {roomData.map((room, index) => (
                  <div className="flex">
                    <div className="flex w-96 h-24 mt-8 bg-white drop-shadow-xl justify-center items-center">
                      <div className='flex text-2xl font-bold'>{room.name}</div>
                      <div className='flex text-xl ml-9'>{roomCount[index].count}</div>
                    </div>
                  </div>
                ))}

                  
              </div>

          </div>

          <div className="flex flex-col w-1/2 h-full pl-12 pt-24 bg-white justify-center items-center">
              <div className="flex w-full font-bold text-xl pt-8  gap-2 items-center sm:text-3xl">
                  <Icon icon="material-symbols:surfing-sharp" className="flex w-8 h-8  text-black" />
                  <p className='font-normal text-grayprogress'>|</p>
                  <p>รายการจองกิจกรรม</p>
              </div>
              <div className="flex flex-col mb-4 w-full px-4 ">
                {activitiesData.map((room, index) => (
                  <div className="flex">
                    <div className="flex w-96 h-24 mt-8 bg-white drop-shadow-xl justify-center items-center">
                      <div className='flex text-2xl font-bold'>{room.name}</div>
                      <div className='flex text-xl ml-9'>{activitiesCount[index].count}</div>
                    </div>
                  </div>
                ))}

                  
              </div>

          </div>
        </div>
                        
      </div>

    </div>
  )
}
