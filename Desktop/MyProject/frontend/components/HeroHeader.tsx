'use client'
import Image from 'next/image'
import React from 'react'
import { fileURLToPath } from 'url'
import AnimatedDiv from './AnimatedDiv'
import { motion } from "framer-motion";

function HeroHeader() {
  return (

      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}
      className='flex justify-center '>
          <Image src="/invitation.png" width={1000} height={900} alt=''/>
      </motion.div>

      
  )
}

export default HeroHeader