import React, { useEffect, useState } from 'react'
import axios from 'axios'
import POP_HotelEdit from '@/Components/POP_HotelEdit'



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
          <div className="flex w-8/12 h-96 drop-shadow-lg bg-black mt-8" key={index}>
            <div className="flex w-2/6 h-full"></div>
            <div className="flex w-3/6 h-full bg-white">
              <div className="pt-4 pl-8">
                <p className='font-bold text-2xl'>
                  {room.name}
                </p>
                <div className="pl-8">
                  <ul>
                    {room.twin_bed && <li>{room.twin_bed} Twin Bed</li>}
                    {room.double_bed && <li>{room.double_bed} Double Bed</li>}
                  </ul>
                </div>
                <p className='font-bold text-2xl'>
                  {room.price} ฿
                </p>
                <p>/ 1 คืน</p>
              
              </div>
            </div>
            <div className="flex w-1/6 h-full bg-white"
            onClick={() => handleButtonClick(room.id)}>
              แก้ไขข้อมูลห้องพัก
            </div>
          </div>
        ))}
        

        <POP_HotelEdit isOpen={isModalOpen} onClose={handleCloseModal} roomId={selectedRoomID}/>
      </div>
    </>
  )
}
