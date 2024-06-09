'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HotelInformation from './HotelInformation'
import BookingHistory from './BookingHistory'
import axios from 'axios'
import POP_BookingID from '@/Components/POP_BookingID'
import { getIndex, getRoom, getActivity } from '@/lib/supabase'



export default function page() {
  const { data: session, status } = useSession()

  const router = useRouter()
  const [StatePage, setStatePage] = useState<number>(0);
  const [bookingRequest, setBookingRequest] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  const handleButtonClick = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
  };

  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/bookrequest');
        setBookingRequest(response.data.booking);

      } catch {
        console.log('error');
      }
    };
    fetchData();
  },[StatePage])

  console.log(bookingRequest, "bookingRequest")

  return (
    status === 'authenticated' &&
    session.user && (
      <>
        <div className="flex h-screen w-screen flex-col">
          <div className="flex w-full h-1/6 bg-blue-400 justify-between items-center">
            <p className='font-bold text-xl text-white py-16 ml-12'>Sea Central Hotel</p>
            <p className='font-bold text-5xl text-white py-16'>Admin Dashboard</p>
            <p className='font-bold text-xl text-white py-16 mr-12'>Sign out</p>
          </div>
          {/* <div className='flex w-full h-full'><img src={getRoom(`luxury`)}/></div>
            <div className='flex w-full h-full'><img src={getIndex(`index1`)}></img></div>
            <div className='flex w-full h-full'><img src={getActivity(`waterskii`)}></img></div> */}
          <div className="flex h-5/6 w-full">
            <div className="flex h-full w-2/12 bg-white drop-shadow-xl flex-col">
              <div className="flex w-full h-1/3 justify-center items-center font-bold text-2xl cursor-pointer hover:bg-blue-100 transform duration-300"
              onClick={() => setStatePage(0)}>
                Booking Request
              </div>

              <div className="flex w-full h-1/3 justify-center items-center font-bold text-2xl cursor-pointer hover:bg-blue-100 transform duration-300"
              onClick={() => setStatePage(1)}>
                Booking History
              </div>

              <div className="flex w-full h-1/3 justify-center items-center font-bold text-2xl cursor-pointer hover:bg-blue-100 transform duration-300"
              onClick={() => setStatePage(2)}>
              Hotel Information
              </div>

            </div>
            <div className="flex bg-neutral-200 w-10/12 h-full overflow-auto">
              {StatePage === 0 && (

                <>
                  <div className='flex justify-start items-center h-full mt-12 w-full flex-col gap-12 '>
                    {bookingRequest.map((booking, index) => (
                      <div 
                      key={index}
                      className='flex w-11/12 h-full bg-white flex-col'>
                        <div className="flex w-full h-12 justify-center items-center text-white font-bold text-xl bg-blue-400">
                          <div className="flex w-11/12 justify-between">
                            {/* <div className="flex">สถานะ : {booking.status}</div> */}
                            <div className="flex">สถานะ : รอการยืนยัน {booking.id}</div>
                            <div className="flex">จองเมื่อ : {booking.datetime}</div>
                          </div>
                        </div>
                        <div className="flex w-full h-52">
                          <div className="flex w-1/5 h-full justify-center items-center">
                            <div className="flex w-full h-full flex-col">
                              <div className="flex h-1/2 justify-center items-end">
                                Check In
                              </div>
                              <div className="flex h-1/2 justify-center items-center">
                                {booking.checkin.slice(0, 10)}
                              </div>
                            </div>
                          </div>
                          <div className="flex w-1/5 h-full justify-center items-center">
                            <div className="flex w-full h-full flex-col">
                              <div className="flex h-1/2 justify-center items-end">
                                Check Out
                              </div>
                              <div className="flex h-1/2 justify-center items-center">
                                {booking.checkout.slice(0, 10)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-1/5 h-full justify-center items-center">
                            <div className="flex flex-col w-full h-1/2 justify-center items-center">
                              {booking.adult}
                              <p>Adults</p>
                            </div>
                            <div className="flex flex-col w-full h-1/2 justify-center items-center">
                              {booking.children}
                              <p>Children</p>
                            </div>
                          </div>
                          <div className="flex flex-col w-1/5 h-full justify-center items-center">
                            <p>จำนวนห้องพักทั้งหมด</p>
                            <p>{booking.Book_room.length}</p>
                            <p>ห้อง</p>
                          </div>
                          <div className="flex w-1/5 h-full justify-center items-center">
                            <button
                            onClick={() => handleButtonClick(booking.id)}>
                              รายละเอียดเพิ่มเติม
                            </button>
                          </div>

                        </div>
                        
                      </div>
                    ))}
                    
                      <POP_BookingID isOpen={isModalOpen} onClose={handleCloseModal} bookingId={selectedBookingId} />

                  </div>
                </>
              )}
              {StatePage === 1 && <BookingHistory />}
              {StatePage === 2 && <HotelInformation />}
            </div>
          </div>
        </div>
        
      </>
    )
  )
}