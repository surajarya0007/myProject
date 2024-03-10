import Image from 'next/image'
import React from 'react'
import Button from './Button'
import AnimatedDiv from './AnimatedDiv'
import Link from 'next/link'

function CTA() {
  return (
    <AnimatedDiv>
      <div className='flex justify-center py-16 px-8 '>
        <div className='w-1/2'>
            
                <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-900 from-blue-400 ">Capture Your Wedding Memories Here</span></h1>
                <p className="text-sm font-normal text-gray-500 lg:text-xl dark:text-gray-700 pb-10">Sign up or log in to upload your wedding photos and view the invitation</p>

        <div className='space-y-2 space-x-2'>
          <Link href="/login">
            <Button
            type='button'
            title='Login'
            variant='btn_2'
            />
          </Link>
        </div>

        </div>
        <div className="flex justify-center items-center">
            <Image src="/CTA.png" alt='' width={370} height={100}/>
        </div>
        
    </div>
    </AnimatedDiv>
    
  )
}

export default CTA