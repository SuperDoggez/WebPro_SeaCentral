import React, { useEffect, useState } from 'react'
import axios from 'axios'
import POP_HotelEdit from '@/Components/POP_HotelEdit'
import POP_ActivitiesEdit from '@/Components/POP_ActivitiesEdit';



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
  start: string;
  end: string;
}
export default function ActivitiesInfo() {

  const [activitiesType, setActivitiesType] = useState<RoomType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivityID, setSelectedActivityID] = useState<number>(0);

  const handleButtonClick = (activityId: number) => {
    setSelectedActivityID(activityId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

  };

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await axios.get('/api/activity')
        setActivitiesType(response.data.activity)
      } catch {
        console.log('error')
      }
    }
    fetchRoomType()
  },[])
  return (
    <>
      <div className="flex w-full h-full justify-start  items-center flex-col">
        {activitiesType.map((activity, index) => (
          <div className="flex w-8/12 h-96 drop-shadow-lg bg-black mt-8" key={index}>
            <div className="flex w-2/6 h-full"></div>
            <div className="flex w-3/6 h-full bg-white">
              <div className="pt-4 pl-8">
                <p className='font-bold text-2xl'>
                  {activity.name}
                </p>
                <p className='font-bold text-2xl'>
                  {activity.start} - {activity.end}
                </p>
                <p className='font-bold text-2xl'>
                  {activity.price} ฿
                </p>
                <p>/ 1 คืน</p>
              
              </div>
            </div>
            <div className="flex w-1/6 h-full bg-white"
            onClick={() => handleButtonClick(activity.id)}>
              แก้ไขข้อมูลห้องพัก
            </div>
          </div>
        ))}
        

        <POP_ActivitiesEdit isOpen={isModalOpen} onClose={handleCloseModal} activityId={selectedActivityID}/>
      </div>
    </>
  )
}
