import Image from "next/image";
import React from "react";
import AnimatedDiv from "./AnimatedDiv";

function About() {
  return (
    <div className=" flex flex-col justify-center items-center py-20 px-8 bg-gradient-to-t from-red-50 to-purple-50">
      <AnimatedDiv>
        <h1 className=" mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">
            About Us
          </span>
        </h1>
      </AnimatedDiv>
      <hr />
      <AnimatedDiv>
        <div className="text-center flex flex-col sm:flex-row items-center justify-center py-10 space-y-4 space-x-5">
          <div className="">
            <Image src="/bride.png" alt="" width={170} height={100} />
          </div>
          <div className="sm:w-1/2 flex flex-col">
            <h4 className="text-2xl pb-9 font-serif">THE BRIDE</h4>
            <p className="pb-4">
              I think the moment I knew he was “the one” was when I meet him in
              person.
            </p>
            <p>
              Our destined love story blossomed despite distance, founded on
              mutual respect and care. Now, eagerly waiting to anticipate a
              joyous family future together.❣️
            </p>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv>
        <div className="text-center flex flex-col sm:flex-row items-center justify-center pb-10 space-y-4 space-x-5">
          <div className="flex">
            <Image src="/groom.png" alt="" width={220} height={100} />
          </div>
          <div className="sm:w-1/2 flex flex-col">
            <h4 className="text-2xl pb-9 font-serif">THE GROOM</h4>
            <p className="pb-4">
              What can I say, she is pretty much the same in nature just like
              me, at first meeting, everything was so awkward but I still liked
              her.
            </p>
            <p>
              She is going to be a great wife because she does everything with
              her whole heart.
            </p>
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
}

export default About;
