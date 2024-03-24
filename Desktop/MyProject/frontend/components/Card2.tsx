"use client"
import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cardList } from '../constants';
import Image from 'next/image';

function Card2() {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex gap-3  overflow-x-auto" ref={cardContainerRef} style={{ scrollBehavior: 'smooth' }}>
        {cardList.map((card, index) => (
          <div 
            key={index} 
            className="shadow-lg rounded-3xl bg-white"
            style={{ width: '150px', flexShrink: 0 }}
            onClick={() => setSelectedId(card.img)}
          >
            <Image 
              className="rounded-2xl h-full w-full"
              src={card.img}
              alt=""
              height={200}
              width={200}
            />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-200 p-2 rounded-full"
        onClick={scrollLeft}
      >
        {'<'}
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-200 p-2 rounded-full"
        onClick={scrollRight}
      >
        {'>'}
      </button>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50"
            layoutId={selectedId}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black opacity-75"
              onClick={() => setSelectedId(null)} // Close on click outside the image
            />
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Image 
                className=""
                src={selectedId}
                alt=""
                height={500}
                width={500}
              />
              <motion.button 
                className="absolute top-4 right-4"
                onClick={() => setSelectedId(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Card2;
