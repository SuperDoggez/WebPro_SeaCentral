import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import { InputGroup, InputNumber, Stack } from 'rsuite';
import ProgressBar from '@/Components/ProgressBar';
import { getIndex, getRoom, getActivity } from '@/lib/supabase'
import { Icon } from '@iconify/react';

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
    const [scaledIndex, setScaledIndex] = useState<number|null>(null);
    const [scaledIndexMinus, setScaledIndexMinus] = useState<number|null>(null);
    

    const handleMinus = (index: number) => {
        setScaledIndexMinus(index);
        setroomValues(roomvalues.map((value, i) => (i === index && value > 0 ? value - 1 : value)));
        setTimeout(() => setScaledIndexMinus(null), 200); 
    };

    const handlePlus = (index: number) => {
        setScaledIndex(index);
        setroomValues(roomvalues.map((value, i) => (i === index ? value + 1 : value)));
        setTimeout(() => setScaledIndex(null), 200); 
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
    <>
      <div className='flex w-screen h-full justify-center items-start bg-neutral-100'>
        <div className="flex w-9/12 h-full justify-end">
          <div className="flex flex-col w-5/6 h-full mr-12">
            {roomtype.map((room, index) => (
              <div key={room.id} className="mt-8 flex w-full h-64 min-w-96 bg-white drop-shadow-xl">
                <div className="flex w-4/12 bg-cover h-64  bg-center" 
                style={{backgroundImage: `url(${getRoom(`doublebed`)})`}}/>

                <div className="flex flex-col w-5/12 h-full ">
                  <div className="flex w-full h-3/4 flex-col pl-8">
                    <div className='flex w-full text-3xl h-2/6 font-bold pt-4'>
                      {room.name}
                    </div>
                    
                    {room.twin_bed && 
                    <div className='pt-4 pl-6'>
                      &#8226; {room.twin_bed} Twin Bed(s)
                    </div>
                    }




                    {room.double_bed && 
                    <div className='pt-4 pl-6'>
                    &#8226; {room.double_bed} Double Bed(s)
                    </div>
                    }


                    

                    
                  </div>
                  <div className="flex h-1/4 pl-8 w-full">
                    <div className="flex w-1/2 justify-start gap-2">
                      {room.swimming_pool && <Icon icon="mdi:pool" width="40" className='pt-2'/>}
                      {room.bath_tub && <Icon icon="solar:bath-bold" width="40" className='pt-2'/>}
                      <Icon icon="material-symbols:mode-cool" width="40" className='pt-2'/>
                      <Icon icon="fluent-mdl2:breakfast" width="40" className='pt-2'/>
                      <Icon icon="mingcute:parking-line" width="40" className='pt-2'/>
                      <Icon icon="material-symbols:wifi" width="40" className='pt-2'/>
                    </div>
                  </div>



                </div>

                <div className="flex w-3/12">
                  <div className="flex w-1/2 bg-white items-center justify-center flex-col">
                    <p className='text-3xl'>{room.price} ฿</p> 
                    <p className='text-lg font-thin mt-2'>/ 1 day</p> 
                  </div>
                  <div className="flex w-1/2 bg-white justify-center items-center flex-col">
                          <div className="flex w-full h-[20px] justify-center items-center">
                            <Icon icon="bxs:up-arrow" width={scaledIndex === index ? '15px' : '20px'} onClick={() => handlePlus(index)}/>
                          </div>
                            <input className='w-12 h-12 text-center' value={roomvalues[index]} onChange={(value) => handleValueChange(index, Number(value) || 0)} disabled/>
                          <div className="flex w-full h-[20px] justify-center items-center">
                            <Icon icon="bxs:down-arrow" width={scaledIndexMinus === index ? '15px' : '20px'} onClick={() => handleMinus(index)}/>
                          </div>

                  </div>
                </div>
              </div>
              
            ))}
          </div>

        </div>
        <div className="flex w-3/12 h-full mt-8">
            <div className="flex w-3/4 h-full bg-white drop-shadow-xl justify-center flex-col">
              <div className="flex font-bold text-2xl pt-8 justify-center items-center">Book Information</div>
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
                {!roomvalues.every(value => value === 0) ? (
                  <div onClick={() => setStatePage(1)}
                  className='flex w-1/3 bg-bluebase justify-center cursor-pointer items-center rounded-full py-2 font-normal text-xl mt-8 text-white hover:shadow-lg transform duration-200  hover:bg-blue-300'>
                    ดำเนินการต่อ
                  </div> )
                  :
                  (<div
                  className='flex w-1/3 bg-grayprogress justify-center items-center rounded-full py-2 font-normal text-xl mt-8 text-white'>
                    ดำเนินการต่อ
                  </div> )
                  }

              </div>
            </div>
        </div>




        
      </div>
    </>
  );
};