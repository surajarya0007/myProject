import Image from 'next/image'
import React from 'react'
import { fileURLToPath } from 'url'

function HeroHeader() {
  return (
      <div className='flex justify-center '><Image src="/invitation.png" width={1000} height={900} alt=''/></div>
  )
}

export default HeroHeader