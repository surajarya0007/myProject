import React from "react";
import Card2 from "./Card2";
import Button from "./Button";
import Link from "next/link";
import AnimatedDiv from "./AnimatedDiv";

function Gallery() {
  return (
    <section className="py-20 px-8 bg-gradient-to-t from-red-50 to-purple-50">
      <AnimatedDiv>
        <div className="flex flex-col justify-center items-center pb-10 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">
              Wedding Memories
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-800 pb-10">
            Browse through beautiful wedding photos uploaded by our guests.
          </p>
          <Link href="/gallery">
            <Button type="button" title="View All" variant="btn_2" />
          </Link>
        </div>
      </AnimatedDiv>
      <AnimatedDiv>
        <div className="py-5">
          <Card2 />
        </div>
      </AnimatedDiv>
    </section>
  );
}

export default Gallery;
