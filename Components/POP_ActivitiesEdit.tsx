import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { getActivity } from '@/lib/supabase';

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
          const activity = response.data.activity.find((r: ActivityData) => r.id === activityId);
          setActivityData(activity);
          setTempDescription(activity.description);
          setTempPrice(activity.price);
          setTempStart(activity.start);
          setTempEnd(activity.end);
          setTempPer(activity.per_person);
          console.log(activity, "response.data");
        } catch {
          console.log('Error fetching data');
        }
      };
      fetchData();
    }
  }, [isOpen, activityId]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/admin/editinfo/activity`, {
        id: activityId,
        description: tempDescription,
        price: tempPrice,
        start: tempStart,
        end: tempEnd,
        per_person: tempPer,
      });
      console.log(response.data, "response.data");
    } catch {
      console.log('Error fetching data');
    }finally{
        onClose();
        location.reload();
    }
  };

  const handleCancel = () => {
    if (!activityData) return;

    setTempDescription(activityData.description);
    setTempPrice(activityData.price);
    setTempStart(activityData.start);
    setTempEnd(activityData.end);
    setTempPer(activityData.per_person);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white w-11/12 h-5/6">
        <div className="flex w-full justify-end p-2" onClick={onClose}>
          <Icon icon="charm:cross" width="40px" />
        </div>
        <div className="flex w-full h-52 bg-blue-400 justify-center items-center">
          <img src={`${getActivity(activityId)}`} alt="activity" className="w-full h-full object-cover" />
        </div>
        <div className="flex w-full h-full p-4">
          <div className="flex w-2/3 flex-col">
            <div className="text-4xl font-bold ml-6 mt-6">
              {activityData?.name}
            </div>
            <div className="relative mb-4 w-full h-full px-4">
              <div className="mt-4 mb-2 font-bold">Activity Desc</div>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                className="book-detail w-full h-2/3 border-l-2 border-gray-300 pl-2 pt-1 pb2 resize-none bg-gray-50 rounded-sm min-h-32"
              />
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mb-4">
                <label className="block mb-1 font-bold">Service From</label>
                <input
                  type="text"
                  value={tempStart}
                  onChange={(e) => setTempStart(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="w-full mb-4">
                <label className="block mb-1 font-bold">To</label>
                <input
                  type="text"
                  value={tempEnd}
                  onChange={(e) => setTempEnd(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex w-1/3 flex-col justify-center items-start">
            <div className="w-full mb-4 flex items-center">
              <label className="w-1/3 font-bold">ราคา</label>
              <input
                type="number"
                value={tempPrice}
                onChange={(e) => setTempPrice(Number(e.target.value))}
                className="font-bold w-2/3 border-b h-fit py-4 pl-5 text-grayname"
              />
              ฿
            </div>
            <div className="w-full mb-4 flex items-center">
              <label className="w-1/3 font-bold">Per</label>
              <input
                type="number"
                value={tempPer}
                onChange={(e) => setTempPer(Number(e.target.value))}
                className="font-bold w-2/3 border-b h-fit py-4 pl-5 text-grayname"
              />
            </div>
            <div className="flex w-full justify-center items-center mt-8">
              <button
                onClick={handleSave}
                className="ml-2 text-white hover:underline border-2 border-dark1 bg-dark1 rounded-full px-4 py-2"
              >
                ยืนยัน
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

export default POP_ActivitiesEdit;
