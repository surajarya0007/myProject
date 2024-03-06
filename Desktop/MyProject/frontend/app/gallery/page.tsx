import React from 'react'
import Card from '../../components/Card'

function gallery() {
  return (
    <div className='px-10 mt-20 flex flex-col items-center'>
      <h1 className="mb-4 text-3xl font-extrabold font-serif md:text-5xl lg:text-6xl pb-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">Glimps of memories</span></h1>
      <div className='pb-10'>
        <Card />
      </div>
      
    </div>
  )
}

export default gallery