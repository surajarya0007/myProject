'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Card3 from '../../components/Card3'
import { getLocalStorgeToken } from '../../components/getToken'
import { motion } from 'framer-motion'

function Page() {
  const token = getLocalStorgeToken();
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/40 to-purple-50/60">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full bg-pink-200 opacity-20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl" />

      {/* Hero */}
      <div className="relative pt-28 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-4xl">📸</span>
          <h1 className="mt-3 font-heading text-5xl font-bold md:text-6xl lg:text-7xl leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-pink-400">
              Glimpse of Memories
            </span>
          </h1>
          <p className="mt-3 font-body text-gray-500 text-lg max-w-lg mx-auto">
            Every photo here is a moment frozen in time — shared with love.
          </p>
          <div className="mx-auto mt-4 h-px w-40 rounded-full bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </motion.div>

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-7"
        >
          <Link href="/uplode">
            <motion.span
              whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(219,39,119,0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-pink-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4 4 4" />
              </svg>
              Upload Your Photos
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Gallery grid */}
      <div className="relative px-4 pb-24 sm:px-8">
        <Card3 />
      </div>
    </div>
  )
}

export default Page
