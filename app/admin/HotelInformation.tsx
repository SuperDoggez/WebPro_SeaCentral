import React from 'react'
import { useState, useEffect } from 'react'
import RoomInfo from './HotelInformation/RoomInfo'
import ActivitiesInfo from './HotelInformation/ActivitiesInfo'
import axios from 'axios'

export default function HotelInformation () {
  const [statePage, setStatePage] = useState<number>(0)
  const [TempContact, setTempContact] = useState<string>('')
  const [TempEmail, setTempEmail] = useState<string>('')

  useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/editinfo/contact`);    
            setTempContact(response.data.contact);
            setTempEmail(response.data.email);        
        } catch {
            console.log('Error fetching data');
        } 
        };
        fetchData();
    
}, []);

const handleSave = async () => {
    try {
        const response = await axios.put(`/api/admin/editinfo/activity`, {
            contact: TempContact,
            email: TempEmail, 

        });
        console.log(response.data, "response.data");
    } catch {
        console.log('Error fetching data');
    }
}

const handleCancel = () => {
    if (!TempContact || !TempEmail) return ;

    setTempContact(TempContact);
    setTempEmail(TempEmail);


}

  return (
    <>
      <div className='flex w-full h-full flex-col'>
        <div className="flex w-full h-20 bg-blue-200">
          <div 
          onClick={() => setStatePage(0)}
          className='flex w-1/3 h-full justify-center items-center cursor-pointer hover:bg-blue-100 tranform duration-200'>แก้ไขข้อมูลการติดต่อ</div>
          <div 
          onClick={() => setStatePage(1)}
          className='flex w-1/3 h-full justify-center items-center cursor-pointer hover:bg-blue-100 tranform duration-200'>แก้ไขข้อมูลห้องพัก</div>
          <div 
          onClick={() => setStatePage(2)}
          className='flex w-1/3 h-full justify-center items-center cursor-pointer hover:bg-blue-100 tranform duration-200'>แก้ไขข้อมูลกิจกรรม</div>
        </div>
        <div className="flex w-full h-max bg-white pb-8">
          {statePage === 0 && (
            <div className="flex w-full h-full justify-center items-center">
              แก้ไขข้อมูลการติดต่อ

              
            </div>
          )}

          {statePage === 1 && <RoomInfo />}
          {statePage === 2 && <ActivitiesInfo />}
        </div>
      </div>
    </>
  )
}
