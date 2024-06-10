import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HotelInformation from './HotelInformation'
import axios from 'axios'
import POP_BookingID from '@/Components/POP_BookingID'
import { Icon } from '@iconify/react'




export default function BookingHistory () {

  const router = useRouter()
  const [StatePage, setStatePage] = useState<number>(0);
  const [bookingHistory, setBookingHistory] = useState<any[]>([]);
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
        const response = await axios.get('/api/admin/bookhistory');
        setBookingHistory(response.data.book);

      } catch {
        console.log('error');
      }
    };
    fetchData();
  },[StatePage])



  return (
    <>
      <div className='flex justify-start items-center h-full mt-12 w-full flex-col gap-12 drop-shadow-xl'>
                    {bookingHistory.map((booking, index) => (
                      <div 
                      key={index}
                      className='flex w-11/12 h-68 bg-white flex-col rounded-2xl'>
                        <div className="flex w-full h-12 justify-center items-center text-white font-bold text-xl bg-blue-400 rounded-t-2xl">
                          <div className="flex w-11/12 justify-between">
                            {/* <div className="flex">สถานะ : {booking.status}</div> */}
                            <div className="flex">สถานะ : {
                            booking.status === 'pending' ? 'รอการยืนยัน' : booking.status === 'accept' ? 'ยืนยันแล้ว' : 'ถูกยกเลิก'
                            
                            } </div>
                            <div className="flex">จองเมื่อ : {booking.datetime}</div>
                          </div>
                        </div>
                        <div className="flex w-full h-52">
                          <div className="flex w-1/5 h-full justify-center items-center">
                            <div className="flex w-full h-full flex-col">
                              
                              <div className="flex h-2/3 justify-center text-2xl items-center flex-col gap-y-2">
                              <Icon icon="carbon:event-schedule" width="50" height="50"/>
                                Check In
                              </div>
                              <div className="flex h-1/3 text-xl justify-center items-start">
                                {booking.checkin.slice(0, 10)}
                              </div>
                            </div>
                          </div>
                          <div className="flex w-1/5 h-full justify-center items-center border-r">
                            <div className="flex w-full h-full flex-col">
                              <div className="flex h-2/3 justify-center text-2xl items-center flex-col gap-y-2">
                                <Icon icon="carbon:event-schedule" width="50" height="50"/>
                                  Check Out
                              </div>
                              <div className="flex h-1/3 text-xl justify-center items-start">
                                {booking.checkout.slice(0, 10)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-1/5 h-full justify-center items-center">
                            <div className="flex w-full h-1/2 justify-center items-center border-b">
                              <Icon icon="formkit:people" width="30" height="30"/>
                              <div className='flex-col text-xl justify-center pl-4'>
                                <div className="flex  justify-center"> 
                                  {booking.adult}
                                </div>
                                <div className="flex  justify-center">
                                  Adults
                                </div>
                              </div>
                            </div>
                            <div className="flex w-full h-1/2 justify-center items-center">
                              <Icon icon="mingcute:baby-line" width="30" height="30"/>
                              <div className='flex-col text-xl justify-center pl-4'>
                                <div className="flex  justify-center"> 
                                  {booking.children}
                                </div>
                                <div className="flex  justify-center">
                                  Children
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-1/5 h-full justify-center items-center border-l border-r">
                            <p className='text-lg'>จำนวนห้องพักทั้งหมด</p>
                            <p className='text-3xl font-bold'>{booking.Book_room.length}</p>
                            <p className='text-lg'>ห้อง</p>
                          </div>
                          <div className="flex w-1/5  justify-center items-center">
                            <div className="flex h-fit py-2 px-4 justify-center bg-bluebase rounded-full text-white">
                              <button
                              onClick={() => handleButtonClick(booking.id)}>
                                ดูรายละเอียดเพิ่มเติม
                              </button>
                            </div>
                          </div>

                        </div>
                        
                      </div>
                    ))}
                    
                      

                  </div>
        
          <POP_BookingID isOpen={isModalOpen} onClose={handleCloseModal} bookingId={selectedBookingId} />


    </>
  )
}
