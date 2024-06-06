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


interface StateActivitiesProps {
    roomvalues: number[];
    setroomValues: Dispatch<SetStateAction<number[]>>;
    ActivitiesValues: number[];
    setActivitiesValues: Dispatch<SetStateAction<number[]>>;
    StatePage: number;
    setStatePage: Dispatch<SetStateAction<number>>;
    checkInDate: string | null;
    checkOutDate: string | null;
    valueAdults: string | null;
    valueChildren: string | null;
    roomtype: RoomTypeProp[];
    setRoomtype: Dispatch<SetStateAction<RoomTypeProp[]>>;
    ActivitiesType: RoomTypeProp[];
    setActivitiesType: Dispatch<SetStateAction<RoomTypeProp[]>>;
}

export const StateActivities: FC<StateActivitiesProps> = ({
    roomvalues,
    setroomValues,
    ActivitiesValues,
    setActivitiesValues,
    checkInDate,
    checkOutDate,
    valueAdults,
    valueChildren,
    setStatePage,
    roomtype,
    setRoomtype,
    ActivitiesType,
    setActivitiesType,
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
            setRoomtype(response.data.room);
            setActivitiesValues(new Array(response.data.room.length).fill(0));
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }
    )

    return (
        <div>
          <div>เลือกประเภทห้องพัก</div>
          <div>ChechkingDate: {checkInDate}</div>
          <div>CheckoutDate: {checkOutDate}</div>
          <div>Adults: {valueAdults}</div>
          <div>Children: {valueChildren}</div>
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
                      <InputNumber value={ActivitiesValues[index]} onChange={(value) => handleValueChange(index, Number(value) || 0)} />
                      <InputGroup.Button onClick={() => handlePlus(index)}>+</InputGroup.Button>
                    </InputGroup>
                  </Stack>
                </div>
              </div>
            ))}
          </div>
          <div onClick={() => setStatePage(2)}>ดำเนินการต่อ</div>
        </div>
      );
}
