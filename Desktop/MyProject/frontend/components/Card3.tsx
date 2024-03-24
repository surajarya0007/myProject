"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDiv from "./AnimatedDiv";
import LikeButton from "./LikeButton";
import { jwtDecode } from "jwt-decode";
import { Card } from "antd";
import { getLocalStorgeToken } from "./getToken";

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


  const token = getLocalStorgeToken();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      const decoded = jwtDecode<JwtPayload>(token);
      const side = decoded.side;
      const url = new URL("https://you-and-me-api.vercel.app/fetchImages");
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
                        className="object-cover mx-auto rounded-t-2xl"
                        alt={file.name}
                        src={file.thumbnailLink}
                        width={300}
                        height={300}
                      />
                      
                    </a>
                  </div>
                }
              >
                <div className="flex justify-between mt-auto">
                <LikeButton photoId={file.id} />
                  <a
                    href={`https://you-and-me-api.vercel.app/download/${file.id}` }
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



// "use client"
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { Card } from 'antd';
// import { getLocalStorgeToken } from './getToken';
// import { jwtDecode } from 'jwt-decode';

// interface FileItem {
//   webContentLink: string;
//   id: string;
//   webViewLink: string;
//   name: string;
//   thumbnailLink: string;
// }

// interface JwtPayload {
//   side: string;
// }

// function Card3() {
//   const [files, setFiles] = useState<FileItem[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);
//   const [tappedCard, setTappedCard] = useState<FileItem | null>(null);

//   const token = getLocalStorgeToken();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;
//       const decoded = jwtDecode<JwtPayload>(token);
//       const side = decoded.side;
//       const url = new URL('https://you-and-me-api.vercel.app/fetchImages');
//       url.searchParams.append('side', side);

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }
//       const data = await response.json();
//       setFiles(data.files);
//     };
//     fetchData();
//   }, [token]);

//   // Get current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

//   const handleCardTap = (file: FileItem) => {
//     setTappedCard(file);
//   };

//   const closeFullScreen = () => {
//     setTappedCard(null);
//   };

//   return (
//     <div>
//       <div className="container mx-auto">
//         <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
//           {currentItems.map((file) => (
//             <motion.div
//               key={file.id}
//               onTap={() => handleCardTap(file)} // Handle tap on mobile devices
//               whileHover={{ scale: 1.05 }} // Zoom effect on hover
//             >
//               <Card
//                 className="h-full w-full flex flex-col justify-end rounded-3xl object-contain"
//                 hoverable
//                 cover={
//                   <div className="flex items-center justify-center rounded-t-3xl">
//                       <Image
//                         className="object-cover mx-auto rounded-t-2xl"
//                         alt={file.name}
//                         src={file.thumbnailLink}
//                         width={300}
//                         height={300}
//                       />
//                   </div>
//                 }
//               >
//                 <div className="flex justify-between mt-auto">
//                   <a href={`https://you-and-me-api.vercel.app/download/${file.id}`} download>
//                     <Image
//                       src="/downlode-icon.png"
//                       alt="Download"
//                       width={22}
//                       height={22}
//                     />
//                   </a>
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         <div className="flex justify-center space-x-2 pt-7">
//           <button
//             className="bg-pink-700 px-6 py-1 text-white hover:bg-pink-900 gap-20 items-center justify-center rounded-full border"
//             onClick={() =>
//               paginate(currentPage > 1 ? currentPage - 1 : currentPage)
//             }
//           >
//             Prev
//           </button>
//           <span className="text-xl items-center">{currentPage}</span>
//           <button
//             className="bg-pink-700 px-6 py-1 text-white hover:bg-pink-900 gap-3 items-center justify-center rounded-full border"
//             onClick={() =>
//               paginate(
//                 currentPage < Math.ceil(files.length / itemsPerPage)
//                   ? currentPage + 1
//                   : currentPage
//               )
//             }
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       {tappedCard && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
//           onClick={closeFullScreen} // Close full-screen view on click
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <div className="absolute inset-0">
//             <Image
//               src={tappedCard.webViewLink}
//               alt={tappedCard.name}
//               width={500}
//               height={500}
//             />
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// export default Card3;
