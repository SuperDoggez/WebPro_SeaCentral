import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import { InputGroup, InputNumber, Stack } from 'rsuite';
import room from './page';


interface ActivitiesTypeProp {
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

interface RoomTypeProp {
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

interface StateActivitiesProps {
    roomvalues: number[];
    setroomValues: Dispatch<SetStateAction<number[]>>;
    ActivitiesValues: number[];
    setActivitiesValues: Dispatch<SetStateAction<number[]>>;
    StatePage: number;
    setStatePage: Dispatch<SetStateAction<number>>;
    checkInDate: string | null;
    checkOutDate: string | null;
    adult: string | null;
    children: string | null;
    roomtype: RoomTypeProp[];
    setRoomtype: Dispatch<SetStateAction<RoomTypeProp[]>>;
    ActivitiesType: ActivitiesTypeProp[];
    setActivitiesType: Dispatch<SetStateAction<ActivitiesTypeProp[]>>;
    total_price_room: number;
}

export const StateActivities: FC<StateActivitiesProps> = ({
    roomvalues,
    setroomValues,
    ActivitiesValues,
    setActivitiesValues,
    checkInDate,
    checkOutDate,
    adult,
    children,
    setStatePage,
    roomtype,
    setRoomtype,
    ActivitiesType,
    setActivitiesType,
    total_price_room,
}) => {
    const axios = require('axios');

    

    const handleMinus = (index: number) => {
        setActivitiesValues(ActivitiesValues.map((value, i) => (i === index && value > 0 ? value - 1 : value)));
    };

    const handlePlus = (index: number) => {
        setActivitiesValues(ActivitiesValues.map((value, i) => (i === index ? value + 1 : value)));
    };

    const handleValueChange = (index: number, value: number) => {
        setActivitiesValues(ActivitiesValues.map((v, i) => (i === index ? value : v)));
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/activity');
            setActivitiesType(response.data.activity);
            setActivitiesValues(new Array(response.data.activity.length).fill(0));
            
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      },[checkInDate, checkOutDate, adult, children]
    )

    console.log(roomtype,"roomtype")
    console.log(roomvalues,"roomvalues")

    return (
        <div className='flex'>
          <div>เลือกประเภทห้องพัก</div>
          <div>ChechkingDate: {checkInDate}</div>
          <div>CheckoutDate: {checkOutDate}</div>
          <div>Adults: {adult}</div>
          <div>Children: {children}</div>
          <div className="p-8">
            {ActivitiesType.map((activity, index) => (
              <div key={activity.id} className="mt-8">
                <div>{activity.name}</div>
                <div>
                  <Stack>
                    <InputGroup>
                      <InputGroup.Button onClick={() => handleMinus(index)}>-</InputGroup.Button>
                      <InputNumber value={ActivitiesValues[index]} onChange={(value) => handleValueChange(index, Number(value) || 0)} />
                      <InputGroup.Button onClick={() => handlePlus(index)}>+</InputGroup.Button>
                    </InputGroup>
                  </Stack>
                </div>
              </div>
            ))}
          </div>


          <div className="flex flex-col">
          {roomtype
            .filter((room, index) => roomvalues[index] !== 0)
            .map((room) => {
                const originalIndex = roomtype.indexOf(room);
                return (
                <div key={room.id} className="flex flex-col">
                    <div>{room.name} x {roomvalues[originalIndex]}</div>
                    
                    <div>{Number(room.price) * Number(roomvalues[originalIndex])}</div>
                    
                </div>
                );
            })}
            {ActivitiesType
              .filter((activity, index) => ActivitiesValues[index] !== 0)
              .map((activity) => {
                  const originalIndex = ActivitiesType.indexOf(activity);
                  return (
                  <div key={activity.id} className="flex flex-col">
                      <div>{activity.name} x {ActivitiesValues[originalIndex]}</div>
                      
                      <div>{Number(activity.price) * Number(ActivitiesValues[originalIndex])}</div>
                      
                  </div>
                  );
              })}
          </div>
          
            {total_price_room}
          <div onClick={() => setStatePage(0)}>ย้อนกลับ</div>
          <div onClick={() => setStatePage(2)}>ดำเนินการต่อ</div>
        </div>
      );
}
