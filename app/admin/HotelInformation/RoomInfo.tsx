import React, { useEffect, useState } from 'react'
import axios from 'axios'
import POP_HotelEdit from '@/Components/POP_HotelEdit'
import { getIndex, getRoom, getActivity } from '@/lib/supabase'


interface RoomType {
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
export default function RoomInfo() {

  const [roomType, setRoomType] = useState<RoomType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomID, setSelectedRoomID] = useState<number>(0);

  const handleButtonClick = (roomId: number) => {
    setSelectedRoomID(roomId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

  };

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await axios.get('/api/room')
        setRoomType(response.data.room)
      } catch {
        console.log('error')
      }
    }
    fetchRoomType()
  },[])
  return (
    <>
      <div className="flex w-full h-full justify-start  items-center flex-col">
        {roomType.map((room, index) => (
          <div className="flex w-8/12 h-96 drop-shadow-lg bg-white mt-8 rounded-2xl" 
          key={index}>
            <div className="flex w-2/6 h-full bg-cover bg-center rounded-l-2xl"
            style={{backgroundImage: `url(${getRoom(`${room.id}`)})`}}></div>
            <div className="flex w-3/6 h-full bg-white">
              <div className="flex w-full h-3/4 flex-col pl-8 justify-center">
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

                <p className='font-bold text-2xl mt-8 ml-8'>
                  {room.price} ฿
                </p>
                <p className='text-lg ml-8'>/ 1 คืน</p>
              
              </div>
            </div>
            <div className="flex  w-1/6 h-full justify-center items-center">
              <div className="flex h-fit py-2 w-3/4 px-4 justify-center bg-bluebase rounded-full text-white cursor-pointer"
              onClick={() => handleButtonClick(room.id)}>
                แก้ไขข้อมูลห้องพัก
              </div>
            </div>
          </div>
        ))}
        

        <POP_HotelEdit isOpen={isModalOpen} onClose={handleCloseModal} roomId={selectedRoomID}/>
      </div>
    </>
  )
}
