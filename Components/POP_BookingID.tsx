import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { set } from 'date-fns';
import { Icon, InlineIcon } from '@iconify/react';

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
    const [statePage, setStatePage] = useState<number>(0);


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

  if (!isOpen ) return null;

  if (!bookingInfo) return  <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50"><DotLoader color="#36d7b7" /></div>;

  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col  bg-white w-11/12 h-5/6">
            <div className="flex w-full h-12 bg-blue-400">
                <div className="flex w-11/12 pl-8 h-full text-white text-2xl font-bold items-center">Booking ID : {bookingId}</div>
                <div className="flex w-1/12 pr-4 h-full items-center justify-end" onClick={onClose}>
                    <Icon icon="charm:cross" width="40px" />
                </div>
                
            </div>
            <div className="flex w-full h-full">
                <div className="flex flex-col h-full w-1/2 justify-start mt-16 items-center overflow-auto">
                    <div className='text-4xl font-bold w-5/6 mb-4'>Room</div>
                    {bookingInfo?.room.map((room) => {
                        const roomCount = bookingInfo.roomcount.find((rc) => rc.id === room.id);
                        return (
                            <div key={room.id}
                            className='flex bg-white h-24 w-4/6 drop-shadow-xl justify-start items-center mt-4'>
                                <div className='flex w-1/2 h-full justify-center items-center text-white font-bold bg-bluebase text-3xl '>{room.name}</div>
                                <div className='flex w-1/2 h-full justify-center items-center font-bold  text-2xl '>{roomCount ? roomCount.count : 0}</div>
                            </div>
                        );
                    })}
                        <div className='text-4xl font-bold w-5/6 mb-4 mt-12'>Activities</div>
                        {bookingInfo?.activity.map((activity) => {
                        const activityCount = bookingInfo.activitycount.find((ac) => ac.id === activity.id);
                        return (
                            <div key={activity.id}
                            className='flex bg-white h-24 w-4/6 drop-shadow-xl justify-start items-center mt-4'>
                                <div className='flex w-1/2 h-full justify-center items-center text-white font-bold bg-bluebase text-3xl '>{activity.name}</div>
                                <div className='flex w-1/2 h-full justify-center items-center font-bold  text-2xl '>{activityCount ? activityCount.count : 0}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex h-full w-1/2 flex-col justify-center">
                    <div className="flex h-20 justify-center items-center">
                        <div className="flex h-full w-1/2 justify-center items-center hover:bg-slate-200 transform duration-300"
                        onClick={() => setStatePage(0)}>ข้อมูลการจอง</div>
                        <div className="flex h-full w-1/2 justify-center items-center hover:bg-slate-200 transform duration-300 border-l border-black"
                        onClick={() => setStatePage(1)}>ข้อมูลผู้เข้าพัก</div>
                    </div>
                    <div className="flex h-full w-full bg-white">
                        {statePage === 0 ? (
                        <>  
                            <div className="flex w-full h-full flex-col items-center justify-center">
                                <div className="flex w-full h-1/3 border-l border-b ">
                                    <div className="flex w-1/2 flex-col justify-center items-center border-r">
                                        <Icon icon="carbon:event-schedule" width="50" height="50"/>
                                        <div className="flex w-1/2 justify-center items-center mt-4 text-2xl">Check In</div>
                                        <div className="flex w-1/2 justify-center items-center mt-2 text-4xl">{bookingInfo.booking.checkin.slice(0,10)}</div>
                                    </div>
                                    <div className="flex w-1/2 flex-col justify-center items-center">
                                        <Icon icon="carbon:event-schedule" width="50" height="50"/>
                                        <div className="flex w-1/2 justify-center items-center mt-4 text-2xl">Check Out</div>
                                        <div className="flex w-1/2 justify-center items-center mt-2 text-4xl">{bookingInfo.booking.checkout.slice(0,10)}</div>
                                    </div>
                                </div>
                                <div className="flex w-full h-1/3 border-l border-b ">
                                    <div className="flex w-1/2 flex-col justify-center items-center border-r">
                                        <Icon icon="formkit:people" width="50" height="50"/>
                                        <div className="flex w-1/2 justify-center items-center mt-4 text-2xl">Adults</div>
                                        <div className="flex w-1/2 justify-center items-center mt-2 text-4xl">{bookingInfo.booking.adult}</div>
                                    </div>
                                    <div className="flex w-1/2 flex-col justify-center items-center">
                                        <Icon icon="mingcute:baby-line" width="50" height="50"/>
                                        <div className="flex w-1/2 justify-center items-center mt-4 text-2xl">Children</div>
                                        <div className="flex w-1/2 justify-center items-center mt-2 text-4xl">{bookingInfo.booking.children}</div>
                                    </div>
                                </div>
                                <div className="flex w-full h-1/3 text-3xl font-bold justify-center items-center border-l">
                                    Total: {bookingInfo.booking.total_price} ฿
                                </div>
                            </div>
                        
                        
                        
                        </>
                        )
                        
                    
                    
                    
                    :
                     (
                     <>
                        <div className="flex w-full h-full flex-col items-center justify-center border-l">
                            <div className="flex w-fit  border-gray-400 justify-center items-center pt-8">
                                <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                                    <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={bookingInfo.booking.tourist_info.first_name}
                                        type="text" 
                                        placeholder="ชื่อ"
                                        name="first_name"
                                        className="font-bold h-fit py-4 pl-5 text-grayname"
                                        disabled
                                    /> 
                                </div>

                                <div className="flex w-fit border-b border-gray-400 justify-center items-center ml-8">
                                    <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={bookingInfo.booking.tourist_info.last_name}
                                        type="text" 
                                        placeholder="นามสกุล"
                                        name="last_name"
                                        className="font-bold h-fit py-4 pl-5 text-grayname"
                                        disabled
                                    /> 
                                </div>    
                            </div>
                            <div className="flex w-fit  border-gray-400 justify-center items-center pt-8">
                                <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                                    <Icon icon="mingcute:phone-line" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={bookingInfo.booking.tourist_info.phone_number}
                                        type="text" 
                                        placeholder="เบอร์โทรศัพท์"
                                        name="phone_number"
                                        className="font-bold h-fit py-4 pl-5 text-grayname"
                                        disabled
                                    /> 
                                </div>

                                <div className="flex w-fit border-b border-gray-400 justify-center items-center ml-8">
                                    <Icon icon="mingcute:phone-line" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={bookingInfo.booking.tourist_info.phone_number_2}
                                        type="text" 
                                        placeholder="เบอร์โทรศัพท์ (สำรอง)"
                                        name="phone_number_2"
                                        className="font-bold h-fit py-4 pl-5 text-grayname"
                                        disabled
                                    /> 
                                </div>    
                            </div>

                            <div className="flex w-fit min-w-96  border-gray-400 justify-center items-center pt-8">
                                <div className="flex w-full border-b border-gray-400 justify-center items-center">
                                    <Icon icon="ic:outline-email" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={bookingInfo.booking.tourist_info.email}
                                        type="text" 
                                        placeholder="อีเมล์"
                                        name="email"
                                        className="font-bold h-fit py-4 pl-5 w-full text-grayname"
                                        disabled
                                    /> 
                                </div>
                            </div>

                            <div className="flex w-fit min-w-96  border-gray-400 justify-center items-center pt-8">
                                <div className="flex w-full border-b border-gray-400 justify-center items-center">
                                    <Icon icon="oui:vis-map-region" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={bookingInfo.booking.tourist_info.country}
                                        type="text" 
                                        placeholder="Contry/Region"
                                        name="country"
                                        className="font-bold h-fit py-4 pl-5 w-full text-grayname"
                                        disabled
                                    /> 
                                </div>
                            </div>
                            <div className="flex w-11/12  border-gray-400 justify-center items-center pt-8">
                                <div className="flex w-full flex-col border-gray-400 justify-center items-center">
                                    <div className='flex w-full'> คำขอพิเศษ </div>
                                    <div className='flex w-full h-full bg-white drop-shadow-2xl rounded-2xl mt-6 min-h-32'> 
                                    <div className="flex pl-8 pt-4">{bookingInfo.booking.description}</div>
                                    
                                    </div>

                                </div>
                            </div>
                        </div>
                     </>
                     )
                    
                    
                    
                    }
                    </div>

                    {isPending ?
                        <div className="flex h-16 justify-end">
                            <button className='px-6 bg-red-500 mr-4 rounded-full text-white font-bold'
                            onClick={handleReject}>
                                {isRejecting ? 'Loading...': 'ปฎิเสธ'}
                            </button>
                            <button className='px-6 bg-bluebase mr-4 rounded-full text-white font-bold'
                            onClick={handleAccept}>
                                {isAccepting ? (<> ยืนยันการจอง <DotLoader color="#36d7b7" className="w-2"/></>) : 'ยืนยันการจอง'}
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
