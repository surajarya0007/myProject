'use client'
import React from 'react';
import { cardList } from '../constants';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import AnimatedDiv from './AnimatedDiv';
import LikeButton from './LikeButton';

function Card() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <AnimatedDiv>
    <div className="container mx-auto">
      {/* Wrap your grid with AnimatedDiv2 */}

        <motion.div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5" variants={container} initial="hidden" animate="visible">
          {cardList.map((card, index) => (
            // Wrap each card with motion.div and apply item variant
            <motion.div key={index} className="shadow-lg rounded-3xl bg-white" variants={item}>
              <img className="rounded-t-lg" src={card.img} alt="" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-700 mb-4">{card.userName}'s</h3>
                <div className="flex justify-between gap-2">
                  <LikeButton initialLikes={0} />
                  <Image src="/downlode-icon.png" alt="Download" width={25} height={25} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
    </div>
    </AnimatedDiv>
    
  );
}

export default Card;
