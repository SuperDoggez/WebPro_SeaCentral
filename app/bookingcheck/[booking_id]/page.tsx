'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';

export default function page()  {
    const { booking_id } = useParams();
    const [bookingData, setBookingData] = useState<[]>([]);
    console.log(booking_id, "title")

    useEffect(() => {
        const fetchRoomType = async () => {
          try {
            const response = await axios.get(`/api/checkbooking/${booking_id}`)
            setBookingData(response.data)
            console.log(response.data, "response.data")
          } catch {
            console.log('error')
          }
        }
        fetchRoomType()
      },[])
  return (
    <>
        {booking_id}
    </>
  )
}
