import Image from "next/image";
import React from "react";
import AnimatedDiv from "./AnimatedDiv";
import { motion } from "framer-motion";
import { cardList2 } from "../constants";
import AnimatedDiv3 from "./AnimatedDiv3";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function About2() {
  return (
    <div className="flex flex-col justify-center items-center py-20 px-8 bg-gradient-to-t from-red-50 to-purple-50">
      <AnimatedDiv>
        <div className="text-center flex flex-col sm:flex-row items-center justify-center py-10 space-y-4 space-x-5">
          <div className="">
            <Image src="/you-and-me-logo.png" alt="" width={470} height={100} />
          </div>
          <div className="sm:w-1/2 flex flex-col space-y-7">
            <h4 className="text-2xl pb-2 font-serif">Website</h4>
            <p className="">
              It's an invitation to the guests for my sister's wedding.
            </p>
            <p>
              To make this wedding memorable, guests are requested to share
              their moments either in the form of an image, video, or file on this site.
            </p>
            <p>
              There is "NO LIMIT" on uploads. This site will be the virtual
              Wedding Album for the Bride and Groom.
            </p>
          </div>
        </div>
      </AnimatedDiv>
      <AnimatedDiv>
        <h4 className="text-2xl pb-2 font-serif py-9">Made Using</h4>
      <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-3 lg:grid-cols-4 md:gap-10 gap-4 py-9">
        {cardList2.map((card, index) => (
          <motion.div key={index} variants={item} className="flex justify-center items-center h-24 w-24 sm:h-32 sm:w-32">
            <Image 
            className="w-full h-full rounded-3xl"
              src={card.img}
              alt=""
              height={100}
              width={100}
            />
          </motion.div>
        ))}
      </motion.div>
      </AnimatedDiv>
      
    </div>
  );
}

export default About2;
