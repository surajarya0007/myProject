import Image from 'next/image'
import React from 'react'
import AnimatedDiv from './AnimatedDiv'

function GalleryHeroHeader() {
  return (
    <div className='py-20 px-8 bg-gradient-to-t from-red-50 to-purple-100' >
        <AnimatedDiv>
      <h1 className="text-center font-serif mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">
        Select
      </span>
    </h1>
    </AnimatedDiv>
    <div className='flex justify-evenly space-x-7'>
        <AnimatedDiv>
            <div className='flex flex-col items-center justify-center bg-white rounded-3xl px-10 py-7'>
                <div className=''>
                <h4 className='text-2xl text-center pb-9 font-serif text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 '>BRIDE SIDE</h4>
                </div>
                <div className=''>
                <Image src="/bride.png" alt='' width={350} height={100} />
                </div> 
            </div>
        </AnimatedDiv>     
        <AnimatedDiv>
            <div className='flex flex-col items-center justify-center bg-white rounded-3xl px-10 py-7'>
            <div className=''>
                <h4 className='text-2xl text-center pb-9 font-serif text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 '>GROOM SIDE</h4>
            </div>
            <div className=''>
                <Image src="/groom.png" alt='' width={400} height={100} />
                </div> 
        </div>
        </AnimatedDiv>
    </div>
        
        
    </div>
  )
}

export default GalleryHeroHeader