'use client'
import { useState } from 'react';
import Navbar from "@/Components/Navbar";
import CalendarPicker from "@/Components/CalendarPicker";
import { getIndex, getRoom, getActivity } from '@/lib/supabase'
import {Icon} from '@iconify/react'
import Slideshow from '@/Components/slideshow';
import Link from 'next/link';
import Footer from '@/Components/Footer';


export default function Home() {

  return (

    <>
      
      <div className="flex justify-start w-screen h-full flex-col">
      <Navbar />
        <div className="flex justify-center items-center w-full min-h-128 h-3/4 flex-col bg-cover bg-center  bg-no-repeat" style={{backgroundImage: `url(${getIndex(`index1`)})`}}>
          <div className="text-white font-bold text-4xl drop-shadow-xl pt-56">Lost in Paradise at</div>
          <div className="text-white font-bold text-6xl drop-shadow-xl pt-8">Sea Central Hotel</div>
          <div className="relative w-8/12 h-2/6 translate-y-56">
            <CalendarPicker />
          </div>


        </div>
        



      </div>
      <div className="flex w-full h-full pt-48 justify-center items-center flex-col">
        {/* <div className="w-full" style={{backgroundImage: `url(${getIndex(`logo`)})`}}/> */}
        <img src={getIndex(`logo`)} width="250px" className='mb-12'></img>
        <div className='flex font-bold text-2xl text-center w-8/12'>สัมผัสประสบการณ์ใต้ท้องทะเลที่น่าตื่นตาตื่นใจกับกิจกรรมดำน้ำชมปะการังที่เราจัดขึ้น! สำรวจความงามของธรรมชาติใต้ทะเลไปพร้อมกับสัตว์ทะเลนานาชนิด ที่จะทำให้คุณประทับใจไม่รู้ลืม ไม่ว่าคุณจะเป็นนักดำน้ำมือใหม่หรือมืออาชีพ ผู้เชี่ยวชาญของเราพร้อมที่จะนำทางคุณผ่านการผจญภัยครั้งนี้อย่างปลอดภัยและสนุกสนาน</div>
        <div className="flex justify-center items-center w-full min-h-128 bg-fixed h-3/4 flex-col bg-cover bg-center  bg-no-repeat mt-24" 
        style={{backgroundImage: `url(${getIndex(`index2`)})`}}/>
      </div>


      <div className="flex w-full h-full justify-center items-center flex-col">      
        <div className="flex justify-center items-center w-full h-full flex-col bg-cover bg-center  bg-no-repeat mt-24" >
          <div className="flex w-11/12 h-32 bg-cover bg-bottom mt-8 flex-col justify-center items-center drop-shadow-2xl "
            style={{backgroundImage: `url(${getIndex('index3')})`}}>
            <div className="flex text-white text-6xl font-bold drop-shadow-xl">ห้องพักของเรา</div>
          </div>
          

          <div className="flex justify-center items-center min-h-130 w-full h-3/4 flex-col bg-cover bg-center  bg-no-repeat " >
            <Slideshow />

          </div>


          <div className="flex w-full justify-around items-center pt-16">
                <div className="flex flex-col w-1/3 justify-center items-center pt-4">
                  <Icon icon="solar:ranking-outline" width="128"/>
                  <div className="flex text-2xl font-bold pt-8">โรงแรมอันดับหนึ่งในหาดยาว</div>
                </div>
                <div className="flex flex-col w-1/3 justify-center items-center pt-4">
                  <Icon icon="healthicons:award-trophy-outline" width="128"/>
                  <div className="flex text-2xl font-bold pt-8">รางวัลโรงแรมยอดเยี่ยมแห่งปี</div>
                </div>
                <div className="flex flex-col w-1/3 justify-center items-center pt-4">
                  <Icon icon="carbon:review" width="128"/>
                  <div className="flex text-2xl font-bold pt-8">คะแนนรีวิวสูงที่สุดในหาดยาว</div>
                </div>
                
          </div>

          <div className="flex justify-center items-center mt-24 mb-24 w-full h-3/4 flex-col bg-cover bg-center  bg-no-repeat " >
            <div className='flex text-black text-6xl font-bold drop-shadow-xl'>Hotel's Activities</div>

            

          </div>

          {/* <div className="flex h-130 w-11/12 max-h-96 justify-center items-center"> */}
          <div
          className="grid grid-rows-2 grid-flow-col gap-4">
            <Link 
            href="/activity" 
            className="row-span-3 ">
              <div className="relative w-full h-120">
                <img src={getActivity('1')} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 flex items-end"/>
                <div className="absolute inset-0 flex items-end">
                  <Icon icon="material-symbols:surfing" width="90" className='text-white pl-4 pb-4'/>
                  <div className='text-white text-5xl pl-4 pb-4'>Surf Board</div>
                </div>
              </div>
            </Link>


            <Link
            href="/activity"
            className="col-span-3">
              <div className="relative w-full h-96">
                <img src={getActivity('3')} className="object-cover w-full h-96" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 flex items-end"/>
                <div className="absolute inset-0 flex items-end">
                  <Icon icon="map:waterskiing" width="90" className='text-white pl-4 pb-4'/>
                  <div className='text-white text-5xl pl-4 pb-4'>Water Ski</div>
                </div>
              </div>
            </Link>
            
            <Link
            href="/activity"
             className="row-span-2">
              <div className="relative w-full h-96">
                <img src={getActivity('2')} className='object-cover w-full h-96 '/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 flex items-end"/>
                <div className="absolute inset-0 flex items-end">
                  <Icon icon="mdi:diving-snorkel" width="90" className='text-white pl-4 pb-4'/>
                  <div className='text-white text-5xl pl-4 pb-4'>Diving Tour</div>
                </div>
              </div>
            </Link>


            <Link
            href="/activity"
            className="row-span-2">
              <div className="relative w-full h-96">
                <img src={getActivity('4')} className='object-cover w-full h-96 '/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 flex items-end"/>
                <div className="absolute inset-0 flex items-end">
                  <Icon icon="ion:boat-outline" width="90" className='text-white pl-4 pb-4'/>
                  <div className='text-white text-4xl pl-4 pb-4'>Sunset Private Boat</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex w-full h-96 bg-cover bg-center mt-24 justify-center items-center" 
          style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)),url(${getIndex('activity_cover')})`}}>
            <div className="relative text-4xl font-normal text-white">
              Special Offer:   Discount 10% for all activities
              <div className="relative text-4xl font-normal text-yellow-300">
               
              </div>  
            </div>  
          </div>          
        </div>
      </div>
      <Footer />


    </>
    
  );
}
