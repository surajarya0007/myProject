"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDiv from "./AnimatedDiv";
import LikeButton from "./LikeButton";
import { jwtDecode } from "jwt-decode";
import { Card } from "antd";

interface FileItem {
  id: string;
  webViewLink: string;
  name: string;
  thumbnailLink: string;
}


interface JwtPayload { 
  side: string;
}

function Card3() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      const decoded = jwtDecode<JwtPayload>(token);
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
  }, [token]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

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
                key={file.id}
                hoverable
                cover={
                  <div className="flex items-center justify-center rounded-t-3xl">
                    <a href={file.webViewLink}>
                      <Image 
                        className="object-cover mx-auto h-full w-full rounded-t-2xl"
                        alt={file.name}
                        src={file.thumbnailLink}
                        width={300}
                        height={300}
                      />
                      {/* <img
                        className="object-cover mx-auto mt-4 "
                        alt={file.name}
                        src={file.thumbnailLink}
                      /> */}
                    </a>
                  </div>
                }
              >
                <div className="flex justify-between mt-auto">
                <LikeButton photoId={file.id} />
                  <a
                    href={`http://localhost:5050/download/${file.id}` }
                    download
                  >
                    <Image
                      src="/downlode-icon.png"
                      alt="Download"
                      width={22}
                      height={22}
                    />
                  </a>
                </div>
              </Card>
            </AnimatedDiv>
          ))}
        </motion.div>

        <div className="flex justify-center space-x-2 pt-7">
          <button
            className="bg-pink-700 px-6 py-1 text-white hover:bg-pink-900 gap-20 items-center justify-center rounded-full border"
            onClick={() =>
              paginate(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            Prev
          </button>
          <span className="text-xl items-center">{currentPage}</span>
          <button
            className="bg-pink-700 px-6 py-1 text-white hover:bg-pink-900 gap-3 items-center justify-center rounded-full border"
            onClick={() =>
              paginate(
                currentPage < Math.ceil(files.length / itemsPerPage)
                  ? currentPage + 1
                  : currentPage
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card3;