import React from 'react'
import AnimatedDiv3 from './AnimatedDiv3'
import AnimatedDiv from './AnimatedDiv'
import Link from 'next/link'
import Button from './Button'

function Events() {
  return (
  <div className='max-container bg-gradient-to-t from-yellow-100 to-red-100 py-20'>
    <AnimatedDiv>
      <h1 className="flex justify-center mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-yellow-400 from-pink-600 ">
        Events
      </span>
    </h1>
    </AnimatedDiv>
    
      <AnimatedDiv>
        <div className='flex justify-evenly items-center py-10 '>
        <h1 className="  text-2xl font-serif flex items-start justify-center "><span className="text-transparent bg-clip-text bg-gradient-to-tl to-black from-red-500 ">
          || 12 APRIL ||
        </span></h1>
        <h1 className="  text-2xl font-serif flex items-start justify-center "><span className="text-transparent bg-clip-text bg-gradient-to-tl to-black from-red-500 ">
          || 13 APRIL ||
        </span></h1>
        </div>
        
      </AnimatedDiv>

    <div className='flex justify-evenly items-center'>
      <AnimatedDiv3>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-400 from-orange-900 py-6'>हल्दी</div>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-400 from-orange-900 py-6'>संगीत</div>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-400 from-orange-900 py-6'>श्री सत्यनारायण कथा</div>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-400 from-orange-900 py-6'>मेहंदी</div>
      </AnimatedDiv3>
      <AnimatedDiv3>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-300 from-orange-900 py-6'>शादी</div>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-300 from-orange-900 py-6'>विवाह</div>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-300 from-orange-900 py-6'>परिणय</div>
      <div className='flex justify-center text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-t to-yellow-300 from-orange-900 py-6'>विवाहोत्सव</div>
      </AnimatedDiv3>
    </div>
    <AnimatedDiv>
        <Link href="/events" className='flex justify-center items-center text-xl pt-5'>
          <Button
          type='button'
          title='Details'
          variant='btn_3'
          />
        </Link>
    </AnimatedDiv>
    
  </div>
  )
}

export default Events