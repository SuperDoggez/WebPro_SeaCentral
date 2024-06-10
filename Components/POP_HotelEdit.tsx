import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { getIndex, getRoom, getActivity } from '@/lib/supabase'
import { Icon } from '@iconify/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: number | null;
}

interface RoomData {
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



const POP_HotelEdit: React.FC<ModalProps> = ({ isOpen, onClose, roomId }) => {
    const [roomData, setRoomData] = useState<RoomData | null>(null);
    const [tempDescription, setTempDescription] = useState<string>('');
    const [tempPrice, setTempPrice] = useState<number>(0);
    const [tempTwinBed, setTempTwinBed] = useState<number>(0);
    const [tempDoubleBed, setTempDoubleBed] = useState<number>(0);
    const [tempSwimmingPool, setTempSwimmingPool] = useState<boolean>(false);
    const [tempBathTub, setTempBathTub] = useState<boolean>(false);


    useEffect(() => {
        if (isOpen && roomId) {
            const fetchData = async () => {
            try {
                const response = await axios.get(`/api/room`);
                const room = response.data.room.find((r: RoomData) => r.id === roomId);
                setRoomData(room)
                setTempDescription(room.description);
                setTempPrice(room.price);
                setTempTwinBed(room.twin_bed);
                setTempDoubleBed(room.double_bed);
                setTempSwimmingPool(room.swimming_pool);
                setTempBathTub(room.bath_tub);
                console.log(room, "response.data");
            } catch {
                console.log('Error fetching data');
            } 
            };
            fetchData();
        }
    }, [onClose, roomId]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`/api/admin/editinfo/room`, {
                id: roomId,
                description: tempDescription,
                price: tempPrice,
                twin_bed: tempTwinBed,
                double_bed: tempDoubleBed,
                swimming_pool: tempSwimmingPool,
                bath_tub: tempBathTub,

            });
            console.log(response.data, "response.data");
        } catch {
            console.log('Error fetching data');
        }
    }

    const handleCancel = () => {
        if (!roomData) return ;

        setTempDescription(roomData.description);
        setTempPrice(roomData.price);
        setTempTwinBed(roomData.twin_bed);
        setTempDoubleBed(roomData.double_bed);
        setTempSwimmingPool(roomData.swimming_pool);
        setTempBathTub(roomData.bath_tub);
    }


    if (!isOpen ) return null;


  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col  bg-white w-11/12 h-5/6">
        <div className="flex w-full justify-end" onClick={onClose}>
            <Icon icon="charm:cross" width="40px" />
        </div>
            <div className="flex w-full h-52 bg-blue-400">
                <img src={`${getRoom(`${roomId}`)}`} alt="room" className=" w-full object-cover"/>          
            </div>
            <div className="flex w-full h-full">
                <div className="flex w-2/3 flex-col">
                    <div className='flex text-4xl font-bold ml-6 mt-6'>
                        {roomData?.name}
                    </div>
                    <div className="flex relative mb-4 w-full h-full px-4 ">

                        <textarea
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)} 
                            className="book-detail w-full h-2/3 border-l-2 border-gray-300 ml-10 pl-2 pt-1 pb2 mt-8 resize-none bg-gray-50 rounded-sm min-h-32"

                        /> 
                        
                    </div>
                    <div className="flex w-full items-center">
                        <input
                            type='checkbox'
                            checked={tempSwimmingPool}
                            onChange={(e) => setTempSwimmingPool(e.target.checked)} 
                            className="font-bold h-fit py-4 pl-5 text-grayname mr-2 ml-8"
                        /> 
                        <Icon icon="mdi:pool" width="40"/> 
                        <p className='pl-4'>Swimming Pool</p>
                    </div>

                    <div className="flex w-full items-center mt-4 mb-12">
                        <input
                        type='checkbox'
                        checked={tempBathTub}
                        onChange={(e) => setTempBathTub(e.target.checked)} 
                        className="font-bold h-fit py-4 pl-5 text-grayname mr-2 ml-8"
                     /> 
                        <Icon icon="solar:bath-bold" width="40"/> 
                        <p className='pl-4'>Swimming Pool</p>
                    </div>
                    

                    
                </div>
                <div className="flex w-1/3 flex-col justify-center items-start">
                    <p className='w-full flex justify-center items-center'>
                        <input
                        value={tempTwinBed}
                        onChange={(e) => setTempTwinBed(Number(e.target.value))} 
                        className="font-bold w-1/2 border-b h-fit py-4 pl-5 text-grayname"
                        /> 
                        TWIN BED(S)
                    </p>
                    
                    <p className='w-full flex justify-center items-center'>
                        <input
                        value={tempDoubleBed}
                        onChange={(e) => setTempDoubleBed(Number(e.target.value))} 
                        className="font-bold w-1/2 border-b h-fit py-4 pl-5 text-grayname"
                        /> 
                        DOUBLE BED(S)
                    </p>
                    

                    <p className='w-full flex justify-center items-center'>
                        ราคา
                        <input
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))} 
                        className="font-bold w-1/2 border-b h-fit py-4 pl-5 text-graynam"
                        />  ฿ / 1 day
                    </p>
                    <div className="flex mt-8 w-full justify-center items-center">
                        <button
                        onClick={handleSave}
                        className="ml-2 text-white hover:underline border-2 border-dark1 bg-dark1 rounded-full px-4 py-2"
                        >
                        บันทึกข้อมูล
                        </button>
                        <button
                            onClick={handleCancel}
                            className="ml-2 text-white hover:underline border-2 border-dark1 bg-red-600 rounded-full px-4 py-2"
                        >
                        ยกเลิก
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default POP_HotelEdit;
