import Image from 'next/image'
import React from 'react'
import AnimatedDiv from './AnimatedDiv'

function Story() {
  return (
    <AnimatedDiv>
      <div className='flex flex-col justify-center items-center py-20 px-8 '>
      <AnimatedDiv>
      <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">
        Our Story
      </span>
    </h1>
    </AnimatedDiv>
      <Image src="/rest.png" alt='' width={900} height={100} />
      <div className='flex flex-col w-9/12 py-9 text-center'>
      <p className='py-4'>We met through relatives and family suggestions, before meeting her I used to think god hadn't created someone for me but now I think she is the one and destiny brought us together.</p>
      <p>I feel m in love with her I care about her and the whole family. I already picture a great happy and prosperous future ahead with her.</p>
      </div>
    </div>
    </AnimatedDiv>
    
  )
}

export default Story