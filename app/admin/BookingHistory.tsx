import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HotelInformation from './HotelInformation'
import axios from 'axios'
import POP_BookingID from '@/Components/POP_BookingID'




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
      <div className='flex justify-start items-center h-full mt-12 w-full flex-col gap-12 '>
        {bookingHistory.map((booking, index) => (
          <div 
          key={index}
          className='flex w-11/12 h-full bg-white flex-col'>
            <div className="flex w-full h-12 justify-center items-center text-white font-bold text-xl bg-blue-400">
              <div className="flex w-11/12 justify-between">
                <div className="flex">สถานะ : {booking.status}</div>
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
  )
}
