import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number | null;
}

interface ActivityData {
    id: number;
    name: string;
    price: number;
    description: string;
    start: string;
    end: string;
    per_person: number;
}



const POP_ActivitiesEdit: React.FC<ModalProps> = ({ isOpen, onClose, activityId }) => {
    const [activityData, setActivityData] = useState<ActivityData | null>(null);
    const [tempDescription, setTempDescription] = useState<string>('');
    const [tempPrice, setTempPrice] = useState<number>(0);
    const [tempStart, setTempStart] = useState<string>('');
    const [tempEnd, setTempEnd] = useState<string>('');
    const [tempPer, setTempPer] = useState<number>(0);


    useEffect(() => {
        if (isOpen && activityId) {
            const fetchData = async () => {
            try {
                const response = await axios.get(`/api/activity`);
                const room = response.data.activity.find((r: ActivityData) => r.id === activityId);
                setActivityData(room)
                setTempDescription(room.description);
                setTempPrice(room.price);
                setTempStart(room.start);
                setTempEnd(room.end);
                setTempPer(room.per_person);
                console.log(room, "response.data");
            } catch {
                console.log('Error fetching data');
            } 
            };
            fetchData();
        }
    }, [onClose, activityId]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`/api/admin/editinfo/activity`, {
                id: activityId,
                description: tempDescription,
                price: tempPrice,
                start: tempStart,
                end: tempEnd,
                per_person: tempPer

            });
            console.log(response.data, "response.data");
        } catch {
            console.log('Error fetching data');
        }
    }

    const handleCancel = () => {
        if (!activityData) return ;

        setTempDescription(activityData.description);
        setTempPrice(activityData.price);
        setTempStart(activityData.start);
        setTempEnd(activityData.end);
        setTempPer(activityData.per_person);


    }


    if (!isOpen ) return <DotLoader color="#36d7b7" />;


  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col  bg-white w-11/12 h-5/6">
        <div className="flex" onClick={onClose}>{activityId}</div>
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

                     Service From 
                     <input
                     value={tempStart}
                     onChange={(e) => setTempStart(e.target.value)} 
                     className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                     /> 
                     TO
                     <input
                     value={tempEnd}
                     onChange={(e) => setTempEnd(e.target.value)} 
                     className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                     /> 

                </div>
                <div className="flex w-1/3 flex-col">
                    <p className='w-full flex '>
                        <input
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))} 
                        className="font-bold w-full h-fit py-4 pl-5 text-grayname"
                        /> 
                    </p>
                    

                    <input
                     value={tempPer}
                     onChange={(e) => setTempPer(Number(e.target.value))} 
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

export default POP_ActivitiesEdit;
