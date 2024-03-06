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
      <div className="flex gap-6 overflow-x-auto" ref={cardContainerRef}>
        {cardList.map((card, index) => (
          <div key={index} className="shadow-lg rounded-3xl bg-white w-64 sm:w-auto">
            <img className="rounded-t-lg w-full" src={card.img} alt="" />
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-700 mb-3">{card.userName}'s</h3>
              <div className="flex justify-around gap-2">
                <Button
                  type="button"
                  title=""
                  icon="/like-icon.png"
                  variant="btn_1"
                />
                <Button
                  type="button"
                  title=""
                  icon="/downlode-icon.png"
                  variant="btn_1"
                />
              </div>
            </div>
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
