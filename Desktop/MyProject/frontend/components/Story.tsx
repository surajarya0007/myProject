import Image from 'next/image'
import React from 'react'

function Story() {
  return (
    <div className='flex flex-col justify-center items-center py-20 px-8 '>
      <h1 className="text-4xl pb-6 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl "><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">Our Story</span></h1>
      <Image src="/rest.png" alt='' width={900} height={100} />
      <div className='flex flex-col w-9/12 py-9 '>
      <p className='py-4'>For our three year anniversary we wanted to re-create our first date. We went to the coffee shop where we met, and then to the small movie theater next door. Instead of a movie, he surprised me with a theater full of friends and family then proposed on stage.</p>
      <p >It is so meaningful to us to share this special day with our most cherished friends and family. We sincerely hope we will have the honor to dine, laugh, and dance with you on our wedding weekend. It would mean the world to us.</p>
      </div>
    </div>
  )
}

export default Story