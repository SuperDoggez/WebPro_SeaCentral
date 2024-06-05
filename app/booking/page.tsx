'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Booking() {
  const searchParams = useSearchParams()

  const checkInDate = searchParams.get('checkInDate')
  const checkOutDate = searchParams.get('checkOutDate')
  const valueAdults = searchParams.get('valueAdults')
  const valueChildren = searchParams.get('valueChildren')

  console.log(checkInDate, checkOutDate, valueAdults, valueChildren, "From booking page")

  return (
    <div>
        <div>ChechkingDate: {checkInDate}</div>
        <div>CheckoutDate: {checkOutDate}</div>
        <div>Adults: {valueAdults}</div>
        <div>Children: {valueChildren}</div>
        <Link
        href={`/booking/package?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&valueAdults=${valueAdults}&valueChildren=${valueChildren}`}
        className="flex">จองแบบ Package</Link>

        <Link 
        href={`/booking/room?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&valueAdults=${valueAdults}&valueChildren=${valueChildren}`} 
        className="flex">เลือกห้องพักด้วยตนเอง</Link>
    </div>
    
  )
}