'use client'
import { motion, useScroll, useTransform } from "framer-motion"
import Image from 'next/image'
import { useRef } from "react"
import AnimatedDiv from "./AnimatedDiv";


function Event() {

  const container = useRef(null);
  const {scrollYProgress } = useScroll({
    target: container,
    offset: ['start start','end end']
  })

  const scale4 = useTransform(scrollYProgress, [0,1], [0,3])

  return (

    <section className="">

      <div className='text-center pt-20 px-10 sm:px-28 lg:px-52 xl:px-64 '>
        <h1 className="text-xl font-semibold md:text-5xl lg:text-xl "><span className="text-transparent bg-clip-text bg-gradient-to-tl to-black from-red-500 ">
        || ॐ श्री गणेशाय नम ||
        </span></h1>
      </div>
    
    <div ref={container} className='h-[150] lg:h-[300vh]  relative '>
      <div className='text-center py-28 sm:py-40 lg:py-52 xl:py-60 px-10 sm:px-28 lg:px-52 xl:px-64 '>
      <AnimatedDiv>
        <h1 className="text-3xl font-extrabold md:text-5xl lg:text-6xl "><span className="text-transparent bg-clip-text bg-gradient-to-tl to-yellow-300 from-red-500 ">
        ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थसाधिके।
        शरण्ये त्रयम्बके गौरी नारायणी नमोस्तुते।।
        </span></h1>
      </AnimatedDiv>
        
      </div>
      <div className='sticky top-0 h-[100vh] '>  
        <div className='w-full h-full absolute top-0 flex items-center justify-center'>
          <motion.div style={{scale: scale4}} className='w-[26vw] h-[22vh] lg:w-[50vw] lg:h-[70vh] relative '>
            <Image 
              className='object-cover'
              src="/ganesh.png" 
              alt='' 
              fill
            />
          </motion.div>
        </div>
      </div>
    </div>

    

    </section>
    
  )
}

export default Event