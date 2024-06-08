'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getIndex, getRoom, getActivity } from '@/lib/supabase'

export default function Profile() {
  const { data: session, status } = useSession()

  const router = useRouter()

  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    status === 'authenticated' &&
    session.user && (
      <div className="flex h-screen items-center text-center justify-center text-black">
        <div className="flex-col items-center text-ceneter bg-white p-6 rounded-md shadow-md w-1/2">
          <p>
            Welcome, Admin <b>{session.user.username}!</b>
          </p>
          <p>Email: {session.user.email}</p>
          <p>ID: {session.user.id}</p>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="p-10 bg-blue-500 text-white py-2 rounded"
          >
            Logout
          </button>
          <div className='flex items-center pt-5 gap-10'>
            <div className='flex w-full h-full'><img src={getRoom(`luxury`)}/></div>
            <div className='flex w-full h-full'><img src={getIndex(`index1`)}></img></div>
            <div className='flex w-full h-full'><img src={getActivity(`waterskii`)}></img></div>
          </div>
        </div>
      </div>
    )
  )
}