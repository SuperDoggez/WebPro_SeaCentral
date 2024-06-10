import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import { InputGroup, InputNumber, Stack } from 'rsuite';
import { getRoom, getActivity, getIndex } from '@/lib/supabase'
import { Icon } from '@iconify/react';

interface ActivitiesTypeProp {
    id: number;
    name: string;
    price: number;
    twin_bed: number;
    per_person: number;
    description: string;
    picture: string[];
    start: string;
    end: string;
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
    per_person: number;
    start: string;
    end: string;
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
    const [scaledIndex, setScaledIndex] = useState<number|null>(null);
    const [scaledIndexMinus, setScaledIndexMinus] = useState<number|null>(null);
    

    const handleMinus = (index: number) => {
        setScaledIndexMinus(index);
        setActivitiesValues(ActivitiesValues.map((value, i) => (i === index && value > 0 ? value - 1 : value)));
        setTimeout(() => setScaledIndexMinus(null), 200); 
    };

    const handlePlus = (index: number) => {
        setScaledIndex(index);
        setActivitiesValues(ActivitiesValues.map((value, i) => (i === index ? value + 1 : value)));
        setTimeout(() => setScaledIndex(null), 200);
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
        <div className='flex w-full h-full pb-24 flex-col justify-start items-center bg-neutral-100'>
          <div className="flex w-11/12 h-32 min-h-32 bg-cover bg-bottom mt-8 justify-center items-center "
            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${getIndex('activity_cover')})`}}>
              <div className="absolute font-thin text-5xl text-white drop-shadow-xl">
                Special Offer: Discount 20%
              </div>
          </div>
          <div className='flex w-full'>
          <div className="flex w-9/12 h-full justify-end">
            <div className="flex flex-col w-5/6 h-full mr-12">
              {ActivitiesType.map((activity, index) => (
                <div key={activity.id} className="mt-8 flex w-full h-64 min-w-96 bg-white drop-shadow-xl">
                  <div className="flex w-4/12 bg-cover h-64  bg-top" 
                  style={{backgroundImage: `url(${getActivity(`${activity.id}`)})`}}/>

                  <div className="flex flex-col w-5/12 h-full ">
                    <div className="flex w-full h-3/4 flex-col pl-8">
                      <div className='flex w-full text-3xl h-2/6 font-bold pt-4'>
                        {activity.name}
                      </div>
                      
                      
                      <div className='pt-4 pl-6 text-xl'>
                        Service {activity.start} - {activity.end}
                      </div>
                      




                      


                      

                      
                    </div>
                    



                  </div>

                  <div className="flex w-3/12">
                    <div className="flex w-1/2 bg-white items-center justify-center flex-col">
                      <p className='text-3xl'>{activity.price} ฿</p> 
                      <p className='text-lg font-thin mt-2'>/ {activity.per_person} 
                      {

                          activity.id === 1 ? " board" : 
                          activity.id === 2 ? " people" : 
                          activity.id === 3 ? " round per person" : " hours"

                      }
                      </p> 
                    </div>
                    <div className="flex w-1/2 bg-white justify-center items-center flex-col">
                            <div className="flex w-full h-[20px] justify-center items-center">
                              <Icon icon="bxs:up-arrow" width={scaledIndex === index ? '15px' : '20px'} onClick={() => handlePlus(index)}/>
                            </div>
                              <input className='w-12 h-12 text-center' value={ActivitiesValues[index]} onChange={(value) => handleValueChange(index, Number(value) || 0)} disabled/>
                            <div className="flex w-full h-[20px] justify-center items-center">
                              <Icon icon="bxs:down-arrow" width={scaledIndexMinus === index ? '15px' : '20px'} onClick={() => handleMinus(index)}/>
                            </div>
                    </div>
                  </div>
                </div>
                
              ))}
              <div onClick={() => setStatePage(0)}
                    className='flex w-1/12 bg-bluebase justify-center cursor-pointer items-center rounded-full py-2 font-normal text-xl mt-8 text-white hover:shadow-lg transform duration-200  hover:bg-blue-300'>
                      ย้อนกลับ
                    </div> 
            </div>

          </div>
          <div className="flex w-3/12 h-full mt-8">
              <div className="flex w-3/4 h-full bg-white drop-shadow-xl justify-center flex-col">
                <div className="flex font-bold text-4xl pt-16 justify-center items-center">Book Information</div>
                <div className="flex font-bold text-2xl pt-8 flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center">
                    <Icon icon="carbon:event-schedule" height="40"/>
                    <p className='pt-4 font-normal'>Check In</p>
                    {checkInDate}
                  </div>

                  <div className="flex flex-col justify-center items-center pt-8">
                    <Icon icon="carbon:event-schedule" height="40"/>
                    <p className='pt-4 font-normal'>Check Out</p>
                    {checkOutDate}
                  </div>

                  <div className="flex flex-row gap-8 justify-center w-full items-center pt-8">

                    <div className="flex flex-col justify-center items-center">
                      <Icon icon="formkit:people" height="40"/>
                      <p className='pt-4 font-normal'>Adults: {adult}</p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <Icon icon="mingcute:baby-line" height="40"/>
                      <p className='pt-4 font-normal'>Children: {children}</p>
                    </div>
                  </div>


                  <div className="flex flex-col w-full text-xl justify-center mt-4 items-center">
                    <p className='justify-center items-center text-3xl mt-8'>Payment</p>
                    {roomtype
                      .filter((room, index) => roomvalues[index] !== 0)
                      .map((room) => {
                          const originalIndex = roomtype.indexOf(room);
                          return (
                          <div key={room.id} className="flex w-3/4 flex-col mt-4">
                              <div className="flex w-full font-normal justify-between">
                                <div className="flex justify-center items-end">{room.name}  <p className='text-lg text-gray-400 ml-2 font-normal'> x {roomvalues[originalIndex]}</p></div>
                                <div className="flex justify-center items-end">{Number(room.price) * Number(roomvalues[originalIndex])}</div>
                              </div>
                              

                              
                          </div>
                          );
                      })}
                      {ActivitiesType
                        .filter((activity, index) => ActivitiesValues[index] !== 0)
                        .map((activity) => {
                            const originalIndex = ActivitiesType.indexOf(activity);
                            return (
                            <div key={activity.id} className="flex w-3/4 flex-col mt-4">
                              <div className="flex w-full font-normal justify-between">
                                <div className="flex justify-center items-end">{activity.name} <p className='text-lg text-gray-400 ml-2 font-normal'>x {ActivitiesValues[originalIndex]} </p></div>
                                
                                <div className="flex justify-center items-end">{Number(activity.price) * Number(ActivitiesValues[originalIndex])}</div>
                              </div>
                                
                            </div>
                            );
                        })}
                    </div>

                    <div className="flex w-3/4 flex-col mt-8">
                        <div className="flex w-full font-normal justify-between">
                          <div className="flex">Total</div>
                          
                          <div className="flex">{total_price_room}</div>
                        </div> 
                    </div>

                    
                    <div onClick={() => setStatePage(2)}
                    className='flex w-1/4 min-w-44 bg-bluebase mb-16 justify-center cursor-pointer items-center rounded-full py-2 font-normal text-xl mt-8 text-white hover:shadow-lg transform duration-200  hover:bg-blue-300'>
                      ดำเนินการต่อ
                    </div> 

                </div>
              </div>
          </div>
        </div>


        </div>
      );
}
