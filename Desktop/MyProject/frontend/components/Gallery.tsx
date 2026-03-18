import React from "react";
import Card2 from "./Card2";
import Button from "./Button";
import Link from "next/link";
import AnimatedDiv from "./AnimatedDiv";

function Gallery() {
  return (
    <section className="py-20 px-8 bg-transparent">
      <AnimatedDiv>
        <div className="flex flex-col items-center pb-10 text-center">
          <h2 className="mb-2 font-heading text-4xl font-semibold md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
              Wedding Memories
            </span>
          </h2>
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <p className="text-lg font-body text-gray-500 lg:text-xl pb-6 max-w-xl">
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
