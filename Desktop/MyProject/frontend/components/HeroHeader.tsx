'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";
import TimeSince from "./TimeSince";

function HeroHeader() {
  return (
    <section className="relative w-full overflow-hidden py-16 px-4">
      {/* Decorative radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,180,254,0.25),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-8 text-center"
      >
        {/* Couple names */}
        <div>
          <h1 className="font-heading text-5xl font-semibold md:text-6xl lg:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
              Together Forever
            </span>
          </h1>
          <p className="mt-2 font-body text-gray-500 text-lg tracking-wide">
            13 April 2024 &mdash; The day it all began
          </p>
        </div>

        {/* Time-since counter */}
        <TimeSince />

        {/* Thin decorative divider */}
        <div className="h-px w-40 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />

        {/* Invitation image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl shadow-pink-200"
        >
          <Image
            src="/invitation.png"
            width={1000}
            height={900}
            alt="Wedding invitation"
            priority
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroHeader
