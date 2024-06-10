import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getActivity } from '@/lib/supabase'
import POP_ActivitiesEdit from '@/Components/POP_ActivitiesEdit'

interface ActivityType {
  id: number;
  name: string;
  price: number;
  description: string;
  start: string;
  end: string;
  per_person: number;
}

export default function ActivitiesInfo() {
  const [activitiesType, setActivitiesType] = useState<ActivityType[]>([])
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
    const fetchActivitiesType = async () => {
      try {
        const response = await axios.get('/api/activity')
        setActivitiesType(response.data.activity)
      } catch {
        console.log('error')
      }
    }
    fetchActivitiesType()
  },[])

  return (
    <>
      <div className="flex w-full h-full justify-start items-center flex-col">
        {activitiesType.map((activity, index) => (
          <div className="flex w-8/12 h-96 drop-shadow-lg bg-white mt-8 rounded-2xl" key={index}>
            <div className="flex w-2/6 h-full bg-cover bg-center rounded-l-2xl" style={{ backgroundImage: `url(${getActivity(Number(activity.id))})` }}></div>
            <div className="flex w-3/6 h-full bg-white">
              <div className="flex w-full h-3/4 flex-col pl-8 justify-center">
                <div className='flex w-full text-3xl h-2/6 font-bold pt-4'>
                  {activity.name}
                </div>
                <div className='flex w-full h-2/6 font-bold text-2xl pt-4'>
                  Service From: {activity.start} to {activity.end}
                </div>
                <p className='font-bold text-2xl mt-8 ml-8'>
                  {activity.price} ฿
                </p>
                <p className='text-lg ml-8'>/ Per {activity.per_person}</p>
              </div>
            </div>
            <div className="flex w-1/6 h-full justify-center items-center">
              <div className="flex h-fit py-2 w-3/4 px-4 justify-center bg-bluebase rounded-full text-white cursor-pointer" onClick={() => handleButtonClick(activity.id)}>
                แก้ไขข้อมูลกิจกรรม
              </div>
            </div>
          </div>
        ))}
        <POP_ActivitiesEdit isOpen={isModalOpen} onClose={handleCloseModal} activityId={selectedActivityID}/>
      </div>
    </>
  )
}
