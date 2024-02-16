import React from 'react'
import Card from './Card'

function Gallery() {
  return (
    <section className='flex flex-col justify-center items-center py-20 px-8 bg-red-50 '>
        <div className=''>
            
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">Wedding Memories</span></h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 pb-10">Browse through beautiful wedding photos uploaded by our guests.</p>

        </div>
        <div className='py-5'>

                <Card />

        </div>
    </section>
  )
}

export default Gallery