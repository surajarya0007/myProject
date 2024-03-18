"use client";
import React, { useRef } from 'react';
import { cardList } from '../constants';
import Button from './Button';
import Image from 'next/image';

function Card() {
  const cardContainerRef = useRef(null);

  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex gap-2 overflow-x-auto " ref={cardContainerRef}>
        {cardList.map((card, index) => (
          <div key={index} className="shadow-lg rounded-3xl bg-white w-full h-48 sm:h-full">
            <img className="rounded-2xl w-full h-full" src={card.img} alt="" />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-200 p-2 rounded-full"
        onClick={scrollLeft}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-200 p-2 rounded-full"
        onClick={scrollRight}
      >
        &gt;
      </button>
    </div>
  );
}

export default Card;
