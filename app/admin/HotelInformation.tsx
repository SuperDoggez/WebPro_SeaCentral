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
            setTempContact(response.data.Hotelinfo[0].contact);
            setTempEmail(response.data.Hotelinfo[0].address);    
            console.log(response.data, "response.data")    
        } catch {
            console.log('Error fetching data');
        } 
        };
        fetchData();
    
}, []);

const handleSave = async () => {
    try {
        const response = await axios.put(`/api/admin/editinfo/contact`, {
            contact: TempContact,
            address: TempEmail, 

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
        <div className="flex w-full h-20 shrink-0 bg-blue-200">
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
        <div className="flex w-full h-full bg-white pb-8">
          {statePage === 0 && (
            <div className="flex w-full h-full justify-center items-center">
              <div className="flex w-1/3 h-96 bg-white flex-col">
                <div className="flex w-full h-12 text-4xl font-bold mt-8 justify-center mb-8">
                  ข้อมูลการติดต่อ
                </div>
                <div className="flex w-full h-full flex-col">
                  <div className="flex w-full h-12">
                    <div className="flex w-1/3 h-full justify-center items-center">เบอร์โทร</div>
                    <input 
                    value={TempContact}
                    onChange={(e) => setTempContact(e.target.value)}
                    className="flex w-2/3 h-full border-b" />
                  </div>
                  <div className="flex w-full h-12">
                    <div className="flex w-1/3 h-full justify-center items-center">อีเมลล์</div>
                    <input 
                    value={TempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="flex w-2/3 h-full border-b" />
                  </div>
                </div>
                <div className="flex w-full h-20 gap-6 justify-center">
                  <div 
                  onClick={handleSave}
                  className="flex w-1/3 h-full justify-center items-center bg-blue-400 rounded-full font-bold text-white cursor-pointer hover:bg-blue-300 tranform duration-200">
                    ยืนยันการแก้ไขข้อมูล
                  </div>
                  <div 
                  onClick={handleCancel}
                  className="flex w-1/3 h-full justify-center items-center border-2 rounded-full border-red-500 cursor-pointer hover:bg-blue-300 tranform duration-200">
                    ยกเลิก
                  </div>
                </div>
              </div>

              
            </div>
          )}

          {statePage === 1 && <RoomInfo />}
          {statePage === 2 && <ActivitiesInfo />}
        </div>
      </div>
    </>
  )
}
