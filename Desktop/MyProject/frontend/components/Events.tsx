"use client";
import React from 'react'
import AnimatedDiv from './AnimatedDiv'
import Link from 'next/link'
import Button from './Button'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const DAYS = [
  {
    date: '12 April',
    label: 'Day One',
    events: [
      { name: 'हल्दी', sub: 'Haldi Ceremony' },
      { name: 'संगीत', sub: 'Sangeet Night' },
      { name: 'श्री सत्यनारायण कथा', sub: 'Satyanarayan Puja' },
      { name: 'मेहंदी', sub: 'Mehndi Ceremony' },
    ],
    fromColor: 'from-yellow-400',
    toColor: 'to-orange-500',
    borderColor: 'border-yellow-200',
    badgeBg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
    dotColor: 'bg-orange-400',
    glowColor: 'shadow-orange-200',
  },
  {
    date: '13 April',
    label: 'Day Two — The Wedding',
    events: [
      { name: 'शादी', sub: 'The Wedding' },
      { name: 'विवाह', sub: 'Sacred Union' },
      { name: 'परिणय', sub: 'The Vows' },
      { name: 'विवाहोत्सव', sub: 'Wedding Celebration' },
    ],
    fromColor: 'from-pink-500',
    toColor: 'to-red-500',
    borderColor: 'border-pink-200',
    badgeBg: 'bg-gradient-to-r from-pink-500 to-red-400',
    dotColor: 'bg-pink-500',
    glowColor: 'shadow-pink-200',
  },
]

const cardTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
const itemTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }

function EventCard({ day, index }: { day: typeof DAYS[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const baseDelay = index * 0.12

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...cardTransition, delay: baseDelay }}
      className={`relative flex-1 min-w-[240px] max-w-[320px] rounded-3xl border ${day.borderColor} bg-white overflow-hidden shadow-lg ${day.glowColor}`}
    >
      {/* Gradient top bar — animates in from left */}
      <motion.div
        className={`h-2 w-full ${day.badgeBg}`}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ ...cardTransition, delay: baseDelay + 0.1 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Header — badge then date stagger */}
      <div className="px-7 pt-6 pb-4">
        <motion.span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ${day.badgeBg}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ ...itemTransition, delay: baseDelay + 0.15 }}
        >
          {day.label}
        </motion.span>
        <motion.h3
          className={`mt-2 font-heading text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${day.fromColor} ${day.toColor}`}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...itemTransition, delay: baseDelay + 0.22 }}
        >
          {day.date}
        </motion.h3>
      </div>

      {/* Divider — fades in */}
      <motion.div
        className={`mx-7 h-px bg-gradient-to-r from-transparent ${day.borderColor} to-transparent`}
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ ...itemTransition, delay: baseDelay + 0.28 }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Timeline events */}
      <ul className="relative px-7 py-5 space-y-0">
        {/* Vertical line — grows from top */}
        <motion.div
          className={`absolute left-10 top-5 bottom-5 w-0.5 bg-gradient-to-b from-transparent via-${day.dotColor.replace('bg-', '')} to-transparent opacity-30`}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: baseDelay + 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
        />

        {day.events.map((event, i) => {
          const delay = baseDelay + 0.4 + i * 0.1
          return (
            <motion.li
              key={event.name}
              initial={{ opacity: 0, x: -12, scale: 0.96 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ ...itemTransition, delay }}
              className="flex items-start gap-4 py-3"
            >
              {/* Dot — pops in */}
              <motion.span
                className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${day.dotColor} shadow-sm ring-2 ring-white`}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay }}
              />
              <div className="min-w-0">
                <motion.p
                  className={`font-heading text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${day.fromColor} ${day.toColor}`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.35, delay: delay + 0.05 }}
                >
                  {event.name}
                </motion.p>
                <motion.p
                  className="text-sm text-gray-400 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.35, delay: delay + 0.1 }}
                >
                  {event.sub}
                </motion.p>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}

function Events() {
  return (
    <div className="max-container relative overflow-hidden bg-white/50 backdrop-blur-sm py-20 px-8">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-pink-200 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-200 opacity-20 blur-3xl" />

      <AnimatedDiv>
        <div className="relative mb-12 text-center">
          <h2 className="font-heading text-4xl font-semibold md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
              Wedding Events
            </span>
          </h2>
          <p className="mt-2 font-body text-gray-500">Two days of joy, tradition & celebration</p>
          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>
      </AnimatedDiv>

      {/* Cards row — narrower blocks, centered */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-stretch sm:justify-center sm:gap-6">
        {DAYS.map((day, i) => (
          <EventCard key={day.date} day={day} index={i} />
        ))}
      </div>

      <AnimatedDiv>
        <div className="mt-12 flex justify-center">
          <Link href="/events">
            <Button type="button" title="View Full Details" variant="btn_3" />
          </Link>
        </div>
      </AnimatedDiv>
    </div>
  )
}

export default Events
