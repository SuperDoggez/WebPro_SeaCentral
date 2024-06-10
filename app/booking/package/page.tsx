'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StateRoomType } from './StateRoomType';
import { StateInformation } from './StateInformation';
import { StateInformationCheck } from './StateInformationCheck';
import { StateConfirmation } from './StateConfirmation';
import { ProgressBar } from '@/Components/ProgressBar2';



interface RoomDataProp {
  id: number;
  name: string;
  price: number;
  twin_bed: number;
  double_bed: number;
  description: string;
  picture: string[];
  swimming_pool: boolean;
  bath_tub: boolean;
}

export default function room() {
  const [StatePage, setStatePage] = useState<number>(0);
  const searchParams = useSearchParams();
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const adult = searchParams.get('adult');
  const children = searchParams.get('children');
  const [roomvalues, setroomValues] = useState<number[]>([]);
  const [roomtype, setRoomtype] = useState<RoomDataProp[]>([]);
  const [ActivitiesValue, setActivitiesValues] = useState<number[]>([]);
  const [ActivitiesType, setActivitiesType] = useState<RoomDataProp[]>([]);
  const [booking_id, setBookingId] = useState<number>(0);

  console.log(booking_id,"booking_id")
  const [formData, setFormData] = useState({ first_name: "", last_name: "", phone_number: "", phone_number_2: "", email: "", country: "", description: "", for_other: false});

  const handleFormSubmit = (data: { first_name: string; last_name: string; phone_number: string; phone_number_2: string; email: string; country: string; description: string ; for_other: boolean ;}) => {
    setFormData(data);
  };

  const total_price_room = roomtype
    .filter((room, index) => roomvalues[index] !== 0)
    .reduce((sum, room) => {
        const originalIndex = roomtype.indexOf(room);
        return sum + Number(room.price) * Number(roomvalues[originalIndex]);
  }, 0);


  const total_activities_price = ActivitiesType
    .filter((activity, index) => ActivitiesValue[index] !== 0)
    .reduce((sum, activity) => {
        const originalIndex = ActivitiesType.indexOf(activity);
        return sum + Number(activity.price) * Number(ActivitiesValue[originalIndex]);
    }, 0);

  const total_price = total_price_room + total_activities_price;

  

  console.log("formData", formData);

  return (
    <>
      <div className="flex w-full h-36 bg-bluebase justify-center items-center">
          <div className="flex w-2/3 h-full">
            <ProgressBar step={StatePage + 1} />
          </div>
          
      </div>
    <div className="flex h-full w-screen ">
      {StatePage === 0 && (
        <StateRoomType
          roomvalues={roomvalues}
          setroomValues={setroomValues}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adult={adult}
          children={children}
          setStatePage={setStatePage}
          StatePage={StatePage}
          setRoomtype={setRoomtype}
          roomtype={roomtype}
          total_price_room={total_price}
        />
      )}


      {StatePage === 2 && (
        <StateInformation 
          roomvalues={roomvalues}
          setroomValues={setroomValues}
          ActivitiesValues={ActivitiesValue}
          setActivitiesValues={setActivitiesValues}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adult={adult}
          children={children}
          setStatePage={setStatePage}
          StatePage={StatePage}
          setRoomtype={setRoomtype}
          roomtype={roomtype}
          ActivitiesType={ActivitiesType}
          setActivitiesType={setActivitiesType}
          onFormSubmit={handleFormSubmit}
          total_price_room={total_price}
          total_activities_price={total_activities_price}
        />
      )}

      {StatePage === 3 && (
        <StateInformationCheck
          roomvalues={roomvalues}
          setroomValues={setroomValues}
          ActivitiesValues={ActivitiesValue}
          setActivitiesValues={setActivitiesValues}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adult={adult}
          children={children}
          setStatePage={setStatePage}
          StatePage={StatePage}
          setRoomtype={setRoomtype}
          roomtype={roomtype}
          ActivitiesType={ActivitiesType}
          setActivitiesType={setActivitiesType}
          onFormSubmit={handleFormSubmit}
          formData={formData}
          total_price_room={total_price}
          setBookingId={setBookingId}
          booking_id={booking_id}
        />
      )}

      {StatePage === 4 && (
        <StateConfirmation
          booking_id={booking_id}
        />
      )}

      </div>  
    </>
  );
}