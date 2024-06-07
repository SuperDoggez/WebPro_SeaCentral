import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import Input from '@mui/joy/Input';
import axios from 'axios';

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

interface StateInformationCheckProps {
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
    onFormSubmit: (formData: { first_name: string; last_name: string; phone_number: string; phone_number_2: string; email: string; country: string; description: string ;for_other: boolean ;}) => void;
    formData: { first_name: string; last_name: string; phone_number: string; phone_number_2: string; email: string; country: string; description: string; for_other: boolean };
    total_price_room: number;
    booking_id: number;
    setBookingId: Dispatch<SetStateAction<number>>;
  }
  
export const StateInformationCheck: FC<StateInformationCheckProps> = ({
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
    onFormSubmit,
    formData,
    total_price_room,
    booking_id,
    setBookingId
}) => {



  function changeArrayValues(values: Array<number>) {
    const result = [];
    for (let i = 0; i < values.length; i++) {
        const count = values[i];
        const indexValue = i + 1; // Index starts at 1
        for (let j = 0; j < count; j++) {
            result.push(indexValue);
        }
    }
    return result;
  }

  const roomvaluesArray = changeArrayValues(roomvalues);
  const ActivitiesvaluesArray = changeArrayValues(ActivitiesValues);
  const checkin = checkInDate;
  const checkout = checkOutDate;
  const total_price = total_price_room;
  const IntChildren = Number(children);
  const IntAdult = Number(adult);

  const combinedData = {
    ...formData,
    room_type_id: roomvaluesArray,
    checkin,
    checkout,
    adult: IntAdult,
    children: IntChildren,
    activity_id: ActivitiesvaluesArray,
    total_price,
  };

  console.log("roomvalues", roomvalues);
  console.log("Activitiesvalues", ActivitiesValues);
  console.log("combinedData", combinedData);

    const handleSubmitBooking = async () => {
      try{
        const response = await axios.post('/api/booking', combinedData);
        setBookingId(response.data.booking.id);
        setStatePage(4);
      }catch{
        console.log("error");
      }
    }


    return (
        <div>
          <div>เลือกประเภทห้องพัก</div>
          <div>ChechkingDate: {checkInDate}</div>
          <div>CheckoutDate: {checkOutDate}</div>
          <div>Adults: {adult}</div>
          <div>Children: {children}</div>
          <div className="p-8">
                <Input value={formData.first_name} disabled/>
                <Input value={formData.last_name} disabled/>
                <Input value={formData.phone_number} disabled/>
                <Input value={formData.phone_number_2} disabled/>
                <Input value={formData.email} disabled/>
                <Input value={formData.country} disabled/>
                <Input value={formData.description} disabled/>
                <input type="checkbox" checked={formData.for_other} disabled/>
      
          <div> 
              <button onClick={handleSubmitBooking}>Submit</button>
            </div>
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
        </div>
      );
}
