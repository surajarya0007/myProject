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
        <div className="text-center flex items-center justify-center py-10">
          <div className="w-1/2 flex flex-col justify-center ">
            <h4 className="text-2xl pb-9 font-serif">THE BRIDE</h4>
            <p className="pb-4">
              I think the moment I knew he was “the one” was when I had a work
              assignment that would take me to France for 10 weeks.
            </p>
            <p>
              It was only once I was on the plane I realized how much I would
              miss him. I never wanted to be without him again!
            </p>
          </div>
          <div className="">
            <Image src="/bride.png" alt="" width={250} height={100} />
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv>
        <div className="flex justify-center pb-10">
          <div>
            <Image src="/groom.png" alt="" width={300} height={100} />
          </div>
          <div className="text-center w-1/2 flex flex-col justify-center ">
            <h4 className="text-2xl pb-9 font-serif">THE GROOM</h4>
            <p className="pb-4">
              What can I say, she is amazing. Brilliant, creative, and
              adventurous. I have always been a little bit shy, and she has
              shown me a whole new side of life.
            </p>
            <p>
              I never want to go back to the way life was before I met her. She
              is my forever.
            </p>
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
}

export default About;
