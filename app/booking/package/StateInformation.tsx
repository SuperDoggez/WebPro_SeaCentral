import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';
import Input from '@mui/joy/Input';
import { Icon } from '@iconify/react';




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
        <div className='bg-neutral-100 w-full h-full pb-28'>
            <form onSubmit={handleFormSubmit}>
                <div className='flex w-full'>
                    <div className="flex w-9/12 h-full justify-end pt-8">
                        <div className="flex flex-col w-5/6 h-full pl-8 mr-12 bg-white justify-center items-center shadow-lg">
                            <div className="flex w-full font-bold text-xl pt-24 pl-12  gap-2 items-center sm:text-3xl">
                                <Icon icon="icon-park-outline:people" className="flex w-8 h-8  text-black" />
                                <p className='font-normal text-grayprogress'>|</p>
                                <p>ข้อมูลผู้เข้าพัก</p>
                            </div>
                            <div className="flex w-5/6 justify-center gap-6 items-start flex-col">
                                <div className="flex w-fit  border-gray-400 justify-center items-center pt-8">
                                    <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                                        <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                                        <input
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="ชื่อ"
                                            name="first_name"
                                            className="font-bold h-fit py-4 pl-5 text-grayname"
                                            required
                                        /> 
                                    </div>

                                    <div className="flex w-fit border-b border-gray-400 justify-center items-center ml-8">
                                        <Icon icon="wpf:name" className="flex w-7 h-7  text-gray-400" />
                                        <input
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="นามสกุล"
                                            name="last_name"
                                            className="font-bold h-fit py-4 pl-5 text-grayname"
                                            required
                                        /> 
                                    </div>    
                                </div>

                                <div className="flex w-fit  border-gray-400 justify-center items-center">
                                    <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                                        <Icon icon="mingcute:phone-line" className="flex w-7 h-7  text-gray-400" />
                                        <input
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="เบอร์โทรศัพท์"
                                            name="phone_number"
                                            className="font-bold h-fit py-4 pl-5 text-grayname"
                                            required
                                        /> 
                                    </div>
                                    
                                    <div className="flex w-fit border-b border-gray-400 justify-center items-center ml-8">
                                        <Icon icon="mingcute:phone-line" className="flex w-7 h-7  text-gray-400" />
                                        <input
                                            value={formData.phone_number_2}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="เบอร์โทรศัพท์ (สำรอง)"
                                            name="phone_number_2"
                                            className="font-bold h-fit py-4 pl-5 text-grayname"
                                        /> 
                                    </div>
                                </div>

                                <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                                    <Icon icon="ic:outline-email" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email" 
                                        placeholder="Email"
                                        name="email"
                                        className="font-bold h-fit py-4 pl-5 text-grayname"
                                        required
                                    /> 
                                </div>

                                <div className="flex w-fit border-b border-gray-400 justify-center items-center">
                                    <Icon icon="oui:vis-map-region" className="flex w-7 h-7  text-gray-400" />
                                    <input
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        type="text" 
                                        placeholder="Contry/Region"
                                        name="country"
                                        className="font-bold h-fit py-4 pl-5 text-grayname"
                                        required
                                    /> 
                                </div> 
                            </div>
                            
                            
                            


                            <div className="flex flex-col w-full h-full pl-12 pt-24 bg-white justify-center items-center">
                                <div className="flex w-full font-bold text-xl pt-8  gap-2 items-center sm:text-3xl">
                                    <Icon icon="ph:note" className="flex w-8 h-8  text-black" />
                                    <p className='font-normal text-grayprogress'>|</p>
                                    <p>คำขอพิเศษ</p>
                                </div>
                                <div className='w-11/12 mt-6 justify-start'>
                                    สามารถขอคำขอพิเศษได้โดยทางโรงแรมจะพิจารณาเพิ่มเติมสำหรับคำขอนั้น ๆ เป็นกรณีพิเศษ
                                </div>
                                <div className="flex relative mb-4 w-full px-4 ">

                                    <textarea
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="คำขอเพิ่มเติม"
                                        name="description"
                                        className="book-detail w-full border-l-2 border-gray-300 ml-10 pl-2 pt-1 pb2 mt-8 resize-none bg-gray-50 rounded-sm h-32"

                                    /> 
                                    
                                </div>

                            </div>
                            <div className="flex w-full justify-start items-center gap-4 pt-14 pl-12">
                                <input type="checkbox" name="for_other" checked={formData.for_other} onChange={handleCheckboxChange} /> 
                                <p className='text-lg'>จองให้กับผู้อื่น ฉันไม่ได้เป็นคนเข้าพักด้วยตนเอง</p>
                            </div>
                            <div className="flex w-full mb-8">
                                <div onClick={() => setStatePage(0)}
                                        className='flex w-1/12 bg-bluebase justify-center cursor-pointer items-center rounded-full py-2 font-normal text-xl mt-8 text-white hover:shadow-lg transform duration-200  hover:bg-blue-300'>
                                            ย้อนกลับ
                                </div>      
                            </div>
                            
                        </div>
                        
                    </div>      











            <div className="flex w-3/12 h-full mt-8">
              <div className="flex w-3/4 h-full bg-white drop-shadow-xl justify-center flex-col">
                <div className="flex font-bold text-4xl pt-16 justify-center items-center">
                    Book Information
                </div>
                <div className="flex font-bold text-2xl pt-8 flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                    <Icon icon="carbon:event-schedule" height="40"/>
                    <p className='pt-4 font-normal'>Check In</p>
                    {checkInDate}
                    </div>

                    <div className="flex flex-col justify-center items-center pt-8">
                    <Icon icon="carbon:event-schedule" height="40"/>
                    <p className='pt-4 font-normal'>Check Out</p>
                    {checkOutDate}
                    </div>

                    <div className="flex flex-row gap-8 justify-center w-full items-center pt-8">

                    <div className="flex flex-col justify-center items-center">
                        <Icon icon="formkit:people" height="40"/>
                        <p className='pt-4 font-normal'>Adults: {adult}</p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <Icon icon="mingcute:baby-line" height="40"/>
                        <p className='pt-4 font-normal'>Children: {children}</p>
                    </div>
                    </div>


                    <div className="flex flex-col w-full text-xl justify-center mt-4 items-center">
                    <p className='justify-center items-center text-3xl mt-8'>Payment</p>
                    {roomtype
                        .filter((room, index) => roomvalues[index] !== 0)
                        .map((room) => {
                            const originalIndex = roomtype.indexOf(room);
                            return (
                            <div key={room.id} className="flex w-3/4 flex-col mt-4">
                                <div className="flex w-full font-normal justify-between">
                                <div className="flex justify-center items-end">{room.name}  <p className='text-lg text-gray-400 ml-2 font-normal'> x {roomvalues[originalIndex]}</p></div>
                                <div className="flex justify-center items-end">{Number(room.price) * Number(roomvalues[originalIndex])}</div>
                                </div>
                                

                                
                            </div>
                            );
                        })}
                        {ActivitiesType
                        .filter((activity, index) => ActivitiesValues[index] !== 0)
                        .map((activity) => {
                            const originalIndex = ActivitiesType.indexOf(activity);
                            return (
                            <div key={activity.id} className="flex w-3/4 flex-col mt-4">
                                <div className="flex w-full font-normal justify-between">
                                <div className="flex justify-center items-end">{activity.name} <p className='text-lg text-gray-400 ml-2 font-normal'>x {ActivitiesValues[originalIndex]} </p></div>
                                
                                <div className="flex justify-center items-end">{Number(activity.price) * Number(ActivitiesValues[originalIndex])}</div>
                                </div>
                                
                            </div>
                            );
                        })}
                    </div>

                    <div className="flex w-3/4 flex-col mt-8">
                        <div className="flex w-full font-normal justify-between">
                            <div className="flex">Total</div>
                            
                            <div className="flex">{total_price_room}</div>
                        </div> 
                    </div>

                    {formData.country !== '' && formData.email !== '' && formData.first_name !== '' && formData.last_name !== '' && formData.phone_number !== '' ? (
                    <button type="submit"
                    className='flex w-2/3 mb-14 bg-bluebase justify-center cursor-pointer items-center rounded-full py-2 font-normal text-xl mt-8 text-white hover:shadow-lg transform duration-200  hover:bg-blue-300'>
                        ดำเนินการต่อ
                    </button> ) 
                    : 
                    (<div className='flex w-2/3 mb-14 bg-grayprogress justify-center items-center rounded-full py-2 font-normal text-xl mt-8 text-white '>
                        ดำเนินการต่อ
                    </div> )
                    }

                </div>
            </div>
          </div>
        </div>
        </form>
    </div>
      );
}
