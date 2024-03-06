import React from 'react'
import Event from '../../components/Event'
import AnimatedDiv from '../../components/AnimatedDiv'
import Image from 'next/image'


function page() {
  return (
    <div>

      <Event />
      <div>
        <h1 className="  text-3xl font-semibold flex items-start justify-center "><span className="text-transparent bg-clip-text bg-gradient-to-tl to-black from-red-500 ">
          || मांगलिक कार्यक्रम ||
        </span></h1>
        <div style={{ height: '75px' }}></div> {/* Spacer */}
        <h1 className=' text-6xl font-serif flex item items-center justify-center '>12 April</h1>
      <div className='flex flex-col items-center justify-center space-y-20 py-10 ' >
      <AnimatedDiv>
          <h1 className=' text-4xl lg:text-6xl font-serif flex item items-center justify-center text-transparent bg-clip-text bg-gradient-to-tl to-yellow-300 from-red-700 py-5'>
            HALDI
          </h1>
          <div className='text-xl font-serif flex item items-center justify-center '>
            <Image 
              className='rounded-3xl w-3/4'
              src='/haldi.png'
              alt='haldi image'
              width={900}
              height={900}
              
            />
          </div>
      </AnimatedDiv>
      <AnimatedDiv>
          <h1 className='text-4xl lg:text-6xl font-serif flex item items-center justify-center text-transparent bg-clip-text bg-gradient-to-tl to-yellow-300 from-red-700 py-5'>
            SANGEET
          </h1>
          <div className='text-xl font-serif flex item items-center justify-center '>
            <Image 
              className='rounded-3xl w-3/4'
              src='/sangeet.jpg'
              alt='sangeet image'
              width={900}
              height={900}
            />
          </div>
      </AnimatedDiv>
      <AnimatedDiv>
          <h1 className=' text-4xl lg:text-6xl font-serif flex item items-center justify-center text-transparent bg-clip-text bg-gradient-to-tl to-yellow-300 from-red-700 py-5'>
            SATYANARAYAN KATHA
          </h1>
          <div className='text-xl font-serif flex item items-center justify-center '>
            <Image 
              className='rounded-3xl w-3/4'
              src='/narayan.png'
              alt='narayan image'
              width={900}
              height={900}
            />
          </div>
      </AnimatedDiv>
      <AnimatedDiv>
          <h1 className=' text-4xl lg:text-6xl font-serif flex item items-center justify-center text-transparent bg-clip-text bg-gradient-to-tl to-yellow-300 from-red-700 py-5'>
            MENDHI
          </h1>
          <div className='text-xl font-serif flex item items-center justify-center '>
            <Image 
              className='rounded-3xl w-3/4'
              src='/mendhi.jpg'
              alt='mendhi image'
              width={900}
              height={900}
            />
          </div>
      </AnimatedDiv>
      
      </div>
      
      <div style={{ height: '75px' }}></div> {/* Another spacer */}
      <h1 className=' text-6xl font-serif flex item items-center justify-center '>13 April</h1>
      <div className='flex flex-col items-center justify-center space-y-20 py-10 ' >
      <AnimatedDiv>
          <h1 className=' text-4xl lg:text-6xl font-serif flex item items-center justify-center text-transparent bg-clip-text bg-gradient-to-tl to-yellow-300 from-red-700 py-5'>
            SHUBH VIVAH
          </h1>
          <div className='text-xl font-serif flex item items-center justify-center '>
            <Image 
              className='rounded-3xl w-3/4 lg:w-full'
              src='/vivah.jpg'
              alt='vivah image'
              width={820}
              height={820}
              
            />
          </div>
      </AnimatedDiv>
      </div>
      </div>


    </div>
  )
}

export default page