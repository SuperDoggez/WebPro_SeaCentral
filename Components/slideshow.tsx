import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getIndex, getRoom, getActivity } from '@/lib/supabase';
import Link from 'next/link';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rooms, setRooms] = useState<any[]>([]);
  const [isFading, setIsFading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/room');
        setRooms(response.data.room);
        console.log(response.data.room);
      } catch {
        console.log('error');
      }
    };
    fetchData();
  }, []);


  const nextSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % rooms.length);
      setIsFading(false);
    }, 500); 
  };


  useEffect(() => {
    if (rooms.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval); 
    }
  }, [rooms]);

  if (rooms.length === 0) {
    return null;
  }

  return (
    <Link
        href={`/roominfo/${rooms[currentSlide].id}`}
        className={`flex justify-end items-start min-h-130 w-full h-3/4 flex-col bg-cover bg-center bg-no-repeat mt-24 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
        style={{
            backgroundImage: rooms.length > 0
            ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${getRoom(rooms[currentSlide].id)})`
            : 'none'
        }}
        >

      {rooms.length > 0 && (
        <>
            <p className="text-white text-5xl font-bold mb-6 ml-24">{rooms[currentSlide].name}</p>
            <p className="text-white text-2xl font-thin mb-28 w-9/12 ml-24 line-clamp-1">{rooms[currentSlide].description}</p>
        </>
      )}
    </Link>
  );
};

export default Slideshow;
