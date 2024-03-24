'use client'
import React from 'react'
import About2 from '../../components/About2'



function Page() {


  return (
    <div className='px-10 mt-24 flex flex-col items-center text-center'>
      <h1 className="mb-4 text-3xl font-extrabold font-serif md:text-5xl lg:text-6xl pb-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">Welcome</span></h1>
      <About2 />
    </div>
  )
}

export default Page