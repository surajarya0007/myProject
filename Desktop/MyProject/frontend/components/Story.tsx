import Image from 'next/image'
import React from 'react'
import AnimatedDiv from './AnimatedDiv'

function Story() {
  return (
    <section className="bg-transparent">
      <AnimatedDiv>
        <div className="flex flex-col items-center px-8 py-20">
          <AnimatedDiv>
            <h2 className="mb-2 text-center font-heading text-4xl font-semibold md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
                Our Story
              </span>
            </h2>
            <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </AnimatedDiv>

          <div className="relative flex items-center justify-center">
            <div className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 blur-2xl opacity-70" />
            <Image src="/rest2.png" alt="" width={220} height={200} className="relative drop-shadow-md" />
          </div>

          <blockquote className="mt-10 max-w-2xl text-center">
            <p className="font-heading text-xl italic leading-relaxed text-gray-700 md:text-2xl">
              &ldquo;We met through relatives and family suggestions. Before meeting her I used to think god had not created someone for me &mdash; but now I think she is the one and destiny brought us together.&rdquo;
            </p>
            <p className="mt-6 font-body text-base leading-relaxed text-gray-500">
              I fell in love with her. I care about her and the whole family. I already picture a great, happy and prosperous future ahead with her.
            </p>
          </blockquote>
        </div>
      </AnimatedDiv>
    </section>
  )
}

export default Story
