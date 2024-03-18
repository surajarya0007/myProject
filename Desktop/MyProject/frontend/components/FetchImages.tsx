'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDiv from "./AnimatedDiv";
import LikeButton from "./LikeButton";
import { jwtDecode } from "jwt-decode";
import { Card, Modal } from "antd"; // Import Modal component from Ant Design

function Card3() {
  const [files, setFiles] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const decoded = jwtDecode(token);
      console.log(decoded);
      const side = decoded.side;
      const url = new URL("http://localhost:5050/fetchImages");
      url.searchParams.append("side", side);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      setFiles(data.files);
    };
    fetchData();
  }, []);

  const currentItems = files;

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
      beforeChildren: true,
    },
  };

  const item = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };


  return (
    <div>
      <div className="container mx-auto">
        <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {currentItems.map((file) => (
            <AnimatedDiv key={file.id}>
              <Card
                className="h-full w-full flex flex-col justify-end rounded-3xl object-contain"
                hoverable
                cover={
                  <div
                    className="flex items-center justify-center rounded-t-3xl"
                  >
                      <img
                        className="object-cover mx-auto mt-5"
                        alt={file.name}
                        src={file.downloadableLink}
                      />
                  </div>
                }
              >
                
              </Card>
            </AnimatedDiv>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

export default Card3;