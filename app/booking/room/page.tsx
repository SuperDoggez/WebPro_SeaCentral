'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StateRoomType } from './StateRoomType';
import { StateActivities } from './StateActivities';

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
  const valueAdults = searchParams.get('valueAdults');
  const valueChildren = searchParams.get('valueChildren');
  const [roomvalues, setroomValues] = useState<number[]>([]);
  const [roomtype, setRoomtype] = useState<RoomDataProp[]>([]);
  const [ActivitiesValue, setActivitiesValues] = useState<number[]>([]);
  const [ActivitiesType, setActivitiesType] = useState<RoomDataProp[]>([]);

  console.log("roomtype", roomtype);
  console.log("roomvalues", roomvalues);
  console.log("checkInDate", checkInDate);
  console.log("checkOutDate", checkOutDate);
  console.log("valueAdults", valueAdults);
  console.log("valueChildren", valueChildren);

  return (
    <>
      {StatePage === 0 && (
        <StateRoomType
          roomvalues={roomvalues}
          setroomValues={setroomValues}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          valueAdults={valueAdults}
          valueChildren={valueChildren}
          setStatePage={setStatePage}
          StatePage={StatePage}
          setRoomtype={setRoomtype}
          roomtype={roomtype}
        />
      )}


      {StatePage === 1 && (
        <StateActivities 
          roomvalues={roomvalues}
          setroomValues={setroomValues}
          ActivitiesValues={ActivitiesValue}
          setActivitiesValues={setActivitiesValues}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          valueAdults={valueAdults}
          valueChildren={valueChildren}
          setStatePage={setStatePage}
          StatePage={StatePage}
          setRoomtype={setRoomtype}
          roomtype={roomtype}
          ActivitiesType={ActivitiesType}
          setActivitiesType={setActivitiesType}
        />


      )}
    </>
  );
}