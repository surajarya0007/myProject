'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedDiv from './AnimatedDiv';
import LikeButton from './LikeButton';
import { jwtDecode } from "jwt-decode";

function Card() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
        const decoded = jwtDecode(token);
        console.log(decoded);
        // const side = decoded.side;
          const side = "groom";
          const url = new URL('http://localhost:5050/fetchImages');
          url.searchParams.append('side', side);
          
          const response = await fetch(url);
    
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
        const data = await response.json();
        setFiles(data.files);
    };
    fetchData();
  }, []);

  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      },
      beforeChildren: true
    }
  };

  const item = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <motion.div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5" variants={container} initial="hidden" animate="visible">
          {currentItems.map((file) => (
            <AnimatedDiv>
              <motion.div key={file.id} className="shadow-lg rounded-3xl bg-white" variants={item}>
              <img className="rounded-t-lg " src={file.thumbnailLink} alt={file.name}/>
              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-700 mb-4">{file.name}</h3>
                <div className="flex justify-between gap-2">
                  <LikeButton initialLikes={0} />
                  <a href={`http://localhost:5050/download/${file.id}`} download>
                    <Image src="/downlode-icon.png" alt="Download" width={25} height={25} />
                  </a>
                </div>
              </div>
            </motion.div>
            </AnimatedDiv>
            
          ))}
        </motion.div>
        <div className='flex justify-center space-x-2 pt-7'>
          <button className="bg-pink-700 px-6 py-1 text-white hover:bg-pink-900 gap-20 items-center justify-center rounded-full border" onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}>Prev</button>
          <span className='text-xl items-center'>{currentPage}</span>
          <button className="bg-pink-700 px-6 py-1 text-white hover:bg-pink-900 gap-3 items-center justify-center rounded-full border" onClick={() => paginate(currentPage < Math.ceil(files.length / itemsPerPage) ? currentPage + 1 : currentPage)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Card;


