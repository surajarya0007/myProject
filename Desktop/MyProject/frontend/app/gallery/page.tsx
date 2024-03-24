'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Button from '../../components/Button'
import Card3 from '../../components/Card3'
import { getLocalStorgeToken } from '../../components/getToken'

function Page() {

  const token = getLocalStorgeToken();
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  return (
    <div className='px-10 mt-20 flex flex-col items-center text-center'>
      <h1 className="mb-4 text-3xl font-extrabold font-serif md:text-5xl lg:text-6xl pb-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">Glimps of memories</span></h1>
      <Link href="/uplode">
          <Button
          type='button'
          title='Uplode'
          variant='btn_2'
          />
      </Link>
      <div className='py-10'>
        <Card3 />
      </div>
    </div>
  )
}

export default Page