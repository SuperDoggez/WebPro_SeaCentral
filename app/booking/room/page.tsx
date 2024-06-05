'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function room() {
    const searchParams = useSearchParams()
    const checkInDate = searchParams.get('checkInDate')
    const checkOutDate = searchParams.get('checkOutDate')
    const valueAdults = searchParams.get('valueAdults')
    const valueChildren = searchParams.get('valueChildren')
    


  return (
    <>
        <div>
            <div>ChechkingDate: {checkInDate}</div>
            <div>CheckoutDate: {checkOutDate}</div>
            <div>Adults: {valueAdults}</div>
            <div>Children: {valueChildren}</div>
        </div>
    </>
  )
}
