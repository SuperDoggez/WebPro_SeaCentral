import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';


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


    if (!isOpen ) return <DotLoader color="#36d7b7" />;


  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col  bg-white w-11/12 h-5/6">
        <div className="flex" onClick={onClose}>{roomId}</div>
            <div className="flex w-full h-12 bg-blue-400">
                รูปภาพห้องพัก               
            </div>
            <div className="flex w-full h-full">
                <div className="flex w-2/3 flex-col">
                   <input
                     value={tempDescription}
                     onChange={(e) => setTempDescription(e.target.value)} 
                     className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                     /> 

                    <input
                        type='checkbox'
                        checked={tempSwimmingPool}
                        onChange={(e) => setTempSwimmingPool(e.target.checked)} 
                        className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                     /> 

                    <input
                        type='checkbox'
                        checked={tempBathTub}
                        onChange={(e) => setTempBathTub(e.target.checked)} 
                        className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                     /> 
                </div>
                <div className="flex w-1/3 flex-col">
                    <p className='w-full flex '>
                        <input
                        value={tempTwinBed}
                        onChange={(e) => setTempTwinBed(Number(e.target.value))} 
                        className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                        /> 
                        TWIN BED(S)
                    </p>
                    

                    <input
                     value={tempDoubleBed}
                     onChange={(e) => setTempDoubleBed(Number(e.target.value))} 
                     className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                     /> 
                    
                    <input
                     value={tempPrice}
                     onChange={(e) => setTempPrice(Number(e.target.value))} 
                     className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                     /> 

                </div>
                <button
                     onClick={handleSave}
                     className="ml-2 text-white hover:underline border-2 border-dark1 bg-dark1 rounded-full px-4 py-2"
                  >
                  บันทึกข้อมูล
                </button>
                <button
                     onClick={handleCancel}
                     className="ml-2 text-white hover:underline border-2 border-dark1 bg-dark1 rounded-full px-4 py-2"
                  >
                  ยกเลิก
                  </button>
            </div>
        </div>
    </div>
  );
};

export default POP_HotelEdit;
