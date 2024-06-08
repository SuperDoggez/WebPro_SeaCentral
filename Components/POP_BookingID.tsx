import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { set } from 'date-fns';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number | null;
}

interface BookingInfo {
    booking: {
        id: number;
        checkin: string;
        checkout: string;
        children: string;
        adult: string;
        description: string;
        total_price: number;
        datetime: string;
        tourist_info: {
          id: number;
          first_name: string;
          last_name: string;
          phone_number: string;
          phone_number_2: string;
          email: string;
          country: string;
        };
    };
    room: {
        id: number;
        name: string;
        price: number;
    }[];
    roomcount: {
        id: number;
        count: number;
    }[];
    activity: {
        id: number;
        name: string;
        discount_price: number;
    }[];
    activitycount: {
        id: number;
        count: number;
    }[];
    package_: any[];
    packagecount: any[];
}

    const POP_BookingID: React.FC<ModalProps> = ({ isOpen, onClose, bookingId }) => {
    const [bookingInfo, setBookingInfo] = useState<BookingInfo>();
    const [isRejecting, setIsRejecting] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isPending, setIsPending] = useState(false);


  useEffect(() => {
    if (isOpen && bookingId) {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/bookrequest/${bookingId}`);
            setBookingInfo(response.data);
            console.log(response.data, "response.data");
        } catch {
            console.log('Error fetching data');
        } 
        };
        fetchData();
    }
  }, [bookingId]);

  useEffect(() => {
    if (isOpen && bookingId) {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/bookhistory/${bookingId}`);
            if (response.data.booking.status === "pending") {
                setIsPending(true);
            }
        } catch {
            console.log('Error fetching data');
        } 
        };
        fetchData();
    }
  }, [bookingId]);

  const handleReject = async () => {
    if (!bookingInfo) return;
    setIsRejecting(true);
    try {
        const response = await axios.put(`/api/admin/bookrequest/decline`, { "id": Number(bookingId) });
    } catch (error) {
        console.log(bookingId, "booking.id")
        console.error("Error declining booking request", error);
    } finally {
        setIsRejecting(false);
        onClose();
        location.reload();
    }
  };
  

  const handleAccept = async () => {
    if (!bookingInfo) return;
    setIsAccepting(true);
    try {
        const response = await axios.put(`/api/admin/bookrequest/accept`, { "id": Number(bookingId) });
    } catch (error) {
        console.log(bookingId, "booking.id")
        console.error("Error declining booking request", error);
    } finally {
        setIsAccepting(false);
        onClose();
        location.reload();
    }
  };

  if (!isOpen ) return <DotLoader color="#36d7b7" />;

  if (!bookingInfo) return <DotLoader color="#36d7b7" />;

  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col  bg-white w-11/12 h-5/6">
            <div className="flex w-full h-12 bg-blue-400">
                <div className="flex">{bookingId}</div>
                <div className="flex" onClick={onClose}>{bookingId}</div>
                
            </div>
            <div className="flex w-full h-full">
                <div className="flex flex-col h-full w-1/2 justify-center items-center">
                    <p>Room</p>
                    {bookingInfo?.room.map((room) => {
                        const roomCount = bookingInfo.roomcount.find((rc) => rc.id === room.id);
                        return (
                            <div key={room.id}>
                            <p>{room.name} - Count: {roomCount ? roomCount.count : 0}</p>
                            </div>
                        );
                    })}
                        <p>Activities</p>
                        {bookingInfo?.activity.map((activity) => {
                        const activityCount = bookingInfo.activitycount.find((ac) => ac.id === activity.id);
                        return (
                            <div key={activity.id}>
                            <p>{activity.name} - Count: {activityCount ? activityCount.count : 0}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex h-full w-1/2 flex-col justify-center">
                    <div className="flex h-20 justify-center items-center">
                        <div className="flex h-full w-1/2 justify-center items-center hover:bg-slate-200 transform duration-300">ข้อมูลการจอง</div>
                        <div className="flex h-full w-1/2 justify-center items-center hover:bg-slate-200 transform duration-300">ข้อมูลผู้เข้าพัก</div>
                    </div>
                    <div className="flex h-full bg-black">s</div>

                    {isPending ?
                        <div className="flex h-16 justify-end">
                            <button className='px-6'
                            onClick={handleReject}>
                                {isRejecting ? 'Loading...': 'ปฎิเสธ'}
                            </button>
                            <button className='px-6'
                            onClick={handleAccept}>
                                {isAccepting ? 'Loading...': 'ยืนยันการจอง'}
                            </button>
                        </div>  
                        :
                        <div className="flex h-16 justify-end">
                            <button className='px-6' onClick={onClose}>ปิด</button>
                        </div>
                    }
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default POP_BookingID;
