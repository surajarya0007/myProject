import Image from "next/image";
import React from "react";
import AnimatedDiv from "./AnimatedDiv";

function About() {
  return (
    <section className="flex flex-col items-center py-20 px-8 bg-white/50 backdrop-blur-sm">
      <AnimatedDiv>
        <h2 className="mb-2 text-center font-heading text-4xl font-semibold md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
            About Us
          </span>
        </h2>
        <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
      </AnimatedDiv>

      <div className="grid w-full max-w-4xl gap-8 sm:grid-cols-2">
        {/* Bride card */}
        <AnimatedDiv>
          <article className="group flex flex-col overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-200">
            <div className="relative flex h-72 w-full items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50 p-4">
              <Image
                src="/bride2.png"
                alt="The Bride"
                width={290}
                height={260}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col p-6">
              <h3 className="font-heading text-2xl font-semibold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
                  The Bride
                </span>
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                I think the moment I knew he was &quot;The One&quot; was when I met him in person.
              </p>
              <p className="mt-2 leading-relaxed text-gray-500">
                Our destined love story blossomed despite distance, founded on mutual respect and care. Now, joyously living our family future together.❣️
              </p>
            </div>
          </article>
        </AnimatedDiv>

        {/* Groom card */}
        <AnimatedDiv>
          <article className="group flex flex-col overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-200">
            <div className="relative flex h-72 w-full items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50 p-4">
              <Image
                src="/groom.png"
                alt="The Groom"
                width={220}
                height={260}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col p-6">
              <h3 className="font-heading text-2xl font-semibold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
                  The Groom
                </span>
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                What can I say, she is pretty much the same in nature just like me — at first meeting everything was so awkward but I still liked her.
              </p>
              <p className="mt-2 leading-relaxed text-gray-500">
                She is going to be a great wife because she does everything with her whole heart.
              </p>
            </div>
          </article>
        </AnimatedDiv>
      </div>
    </section>
  );
}

export default About;
