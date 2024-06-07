'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Booking() {
  const searchParams = useSearchParams()

  const checkInDate = searchParams.get('checkInDate')
  const checkOutDate = searchParams.get('checkOutDate')
  const adult = searchParams.get('adult')
  const children = searchParams.get('children')

  console.log(checkInDate, checkOutDate, adult, children, "From booking page")

  return (
    <div>
        <div>ChechkingDate: {checkInDate}</div>
        <div>CheckoutDate: {checkOutDate}</div>
        <div>Adults: {adult}</div>
        <div>Children: {children}</div>
        <Link
        href={`/booking/package?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`}
        className="flex">จองแบบ Package</Link>

        <Link 
        href={`/booking/room?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adult=${adult}&children=${children}`} 
        className="flex">เลือกห้องพักด้วยตนเอง</Link>
    </div>
    
  )
}