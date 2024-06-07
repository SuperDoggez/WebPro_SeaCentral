import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import { InputGroup, InputNumber, Stack } from 'rsuite';

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

interface StateRoomTypeProps {
    roomvalues: number[];
    setroomValues: Dispatch<SetStateAction<number[]>>;
    StatePage: number;
    setStatePage: Dispatch<SetStateAction<number>>;
    checkInDate: string | null;
    checkOutDate: string | null;
    adult: string | null;
    children: string | null;
    roomtype: RoomTypeProp[];
    setRoomtype: Dispatch<SetStateAction<RoomTypeProp[]>>;
    total_price_room: number;
}

export const StateRoomType: FC<StateRoomTypeProps> = ({
    roomvalues,
    setroomValues,
    checkInDate,
    checkOutDate,
    adult,
    children,
    setStatePage,
    roomtype,
    setRoomtype,
    total_price_room,
}) => {


    const axios = require('axios');
    

    const handleMinus = (index: number) => {
        setroomValues(roomvalues.map((value, i) => (i === index && value > 0 ? value - 1 : value)));
    };

    const handlePlus = (index: number) => {
        setroomValues(roomvalues.map((value, i) => (i === index ? value + 1 : value)));
    };

    const handleValueChange = (index: number, value: number) => {
        setroomValues(roomvalues.map((v, i) => (i === index ? value : v)));
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/room');
        setRoomtype(response.data.room);
        setroomValues(new Array(response.data.room.length).fill(0));

      } catch {
        console.log('error');
      }
    };
    fetchData();
  }, [checkInDate, checkOutDate, adult, children]);

  
  return (
    <div>
      <div>เลือกประเภทห้องพัก</div>
      <div>ChechkingDate: {checkInDate}</div>
      <div>CheckoutDate: {checkOutDate}</div>
      <div>Adults: {adult}</div>
      <div>Children: {children}</div>
      <div className="p-8">
        {roomtype.map((room, index) => (
          <div key={room.id} className="mt-8">
            <div>{room.name}</div>
            <div>{room.price}</div>
            <div>{room.twin_bed}</div>
            <div>{room.double_bed}</div>
            <div>{room.description}</div>
            <div>{room.swimming_pool}</div>
            <div>{room.bath_tub}</div>
            <div>{room.picture}</div>
            <div>
              <Stack>
                <InputGroup>
                  <InputGroup.Button onClick={() => handleMinus(index)}>-</InputGroup.Button>
                  <InputNumber value={roomvalues[index]} onChange={(value) => handleValueChange(index, Number(value) || 0)} />
                  <InputGroup.Button onClick={() => handlePlus(index)}>+</InputGroup.Button>
                </InputGroup>
              </Stack>
            </div>
          </div>
        ))}
      </div>
      <div onClick={() => setStatePage(1)}>ดำเนินการต่อ</div>
    </div>
  );
};