import React from 'react'
import { cardList } from '../constants'
import Button from './Button'
import Image from 'next/image'


function Card() {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
        {cardList.map( card => (
          <div className="shadow-lg rounded-lg">
            <img className="rounded-t-lg" src={card.img} alt="" />
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-700 mb-3">{card.userName}'s</h3>
              <p className="text-lg font-normal text-gray-600 mb-5">{card.caption}</p>
              <div className="flex justify-between gap-2">
                <Button
                  type="button"
                  title=""
                  icon="/like-icon.png"
                  variant="btn_1"
                />
                <Button 
                  type="button"
                  title=""
                  icon="/chat.png"
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
      
    </div>
  )
}

export default Card