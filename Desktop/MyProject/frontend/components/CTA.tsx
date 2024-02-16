import Image from 'next/image'
import React from 'react'
import Button from './Button'

function CTA() {
  return (
    <div className='flex justify-center py-20 px-8 '>
        <div className='w-1/2'>
            
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-900 from-blue-400 ">Capture Your Wedding Memories Here</span></h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 pb-10">Sign up or log in to upload your wedding photos and view the invitation</p>

        <div className='space-x-10'>
            <Button 
            type="button"
            title="Sign Up"
            variant="btn_1"
            />
            <Button
            type='button'
            title='Login'
            variant='btn_2'
            />
        </div>

        </div>
        <div>
            <Image src="/CTA.png" alt='' width={300} height={100}/>
        </div>
        
    </div>
  )
}

export default CTA