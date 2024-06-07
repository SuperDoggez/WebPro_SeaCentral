import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import Input from '@mui/joy/Input';



interface ActivitiesTypeProp {
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

interface RoomTypeProp {
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

interface StateInformationProps {
    roomvalues: number[];
    setroomValues: Dispatch<SetStateAction<number[]>>;
    ActivitiesValues: number[];
    setActivitiesValues: Dispatch<SetStateAction<number[]>>;
    StatePage: number;
    setStatePage: Dispatch<SetStateAction<number>>;
    checkInDate: string | null;
    checkOutDate: string | null;
    adult: string | null;
    children: string | null;
    roomtype: RoomTypeProp[];
    setRoomtype: Dispatch<SetStateAction<RoomTypeProp[]>>;
    ActivitiesType: ActivitiesTypeProp[];
    setActivitiesType: Dispatch<SetStateAction<ActivitiesTypeProp[]>>;
    onFormSubmit: (formData: { first_name: string; last_name: string; phone_number: string; phone_number_2: string; email: string; country: string; description: string ; for_other: boolean; }) => void;
    total_price_room: number;
    total_activities_price: number;
}

export const StateInformation: FC<StateInformationProps> = ({
    roomvalues,
    setroomValues,
    ActivitiesValues,
    setActivitiesValues,
    checkInDate,
    checkOutDate,
    adult,
    children,
    setStatePage,
    roomtype,
    setRoomtype,
    ActivitiesType,
    setActivitiesType,
    onFormSubmit,
    total_price_room,
    total_activities_price,
}) => {
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        phone_number_2: '',
        email: '',
        country: '',
        description: '',
        for_other: false,
    });
        
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }));
    };
    
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onFormSubmit(formData); 
        setStatePage(3);
        };


        
    return (
        <div>
          <div>เลือกประเภทห้องพัก</div>
          <div>ChechkingDate: {checkInDate}</div>
          <div>CheckoutDate: {checkOutDate}</div>
          <div>Adults: {adult}</div>
          <div>Children: {children}</div>
          <div className="p-8">
            <form onSubmit={handleFormSubmit}>
                <Input type="text" placeholder="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange} />
                <Input type="text" placeholder="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
                <Input type="text" placeholder="เบอร์โทรศัพท์" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                <Input type="text" placeholder="เบอร์โทรศัพท์ (สำรอง)" name="phone_number_2" value={formData.phone_number_2} onChange={handleInputChange} />
                <Input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                <Input type="text" placeholder="Contry/Region" name="country" value={formData.country} onChange={handleInputChange} />
                <Input type="text" placeholder="คำขอเพิ่มเติม" name="description" value={formData.description} onChange={handleInputChange} />
                <input type="checkbox" name="for_other" checked={formData.for_other} onChange={handleCheckboxChange} />
                <button type="submit">Submit</button>
            </form>
          </div>
          <div>
            {roomtype
                .filter((room, index) => roomvalues[index] !== 0)
                .map((room) => {
                    const originalIndex = roomtype.indexOf(room);
                    return (
                    <div key={room.id} className="flex flex-col">
                        <div>{room.name} x {roomvalues[originalIndex]}</div>
                        
                        <div>{Number(room.price) * Number(roomvalues[originalIndex])}</div>
                        
                    </div>
                    );
                })}
            {ActivitiesType
                .filter((activity, index) => ActivitiesValues[index] !== 0)
                .map((activity) => {
                    const originalIndex = ActivitiesType.indexOf(activity);
                    return (
                    <div key={activity.id} className="flex flex-col">
                        <div>{activity.name} x {ActivitiesValues[originalIndex]}</div>
                        
                        <div>{Number(activity.price) * Number(ActivitiesValues[originalIndex])}</div>
                        
                    </div>
                    );
                })}
                {total_price_room}
          </div>
        </div>
      );
}
