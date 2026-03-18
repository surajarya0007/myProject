'use client'
import React, { useEffect } from 'react'
import Upload3 from '../../components/Upload3'
import { getLocalStorgeToken } from '../../components/getToken'
import { motion } from 'framer-motion'

function Page() {
  const token = getLocalStorgeToken()
  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/40 to-purple-50/60">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full bg-pink-200 opacity-20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl" />

      {/* Hero */}
      <div className="relative pt-28 pb-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-4xl">🌸</span>
          <h1 className="mt-3 font-heading text-5xl font-bold md:text-6xl leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-pink-400">
              Share Your Memories
            </span>
          </h1>
          <p className="mt-3 font-body text-gray-500 text-lg max-w-md mx-auto">
            Upload your wedding photos and become part of our shared album forever.
          </p>
          <div className="mx-auto mt-4 h-px w-40 rounded-full bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </motion.div>
      </div>

      {/* Uploader */}
      <div className="relative px-4 pb-24 sm:px-8 max-w-2xl mx-auto">
        <Upload3 />
      </div>
    </div>
  )
}

export default Page
