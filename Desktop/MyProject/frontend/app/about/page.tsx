"use client";
import React from "react";
import About2 from "../../components/About2";
import { motion } from "framer-motion";

const JUMP_LINKS = [
  { label: "About", href: "#about", emoji: "💍" },
  { label: "Guide", href: "#guide", emoji: "📖" },
  { label: "Tech Stack", href: "#tech", emoji: "⚙️" },
  { label: "Team", href: "#team", emoji: "👤" },
  { label: "Privacy", href: "#privacy", emoji: "🔒" },
];

export default function Page() {
  return (
    <div className="mt-16 sm:mt-20 bg-gradient-to-b from-rose-50 via-pink-50/40 to-purple-50/60">
      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden py-20 px-6 text-center">
        {/* layered glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,121,249,0.2),transparent_65%)]" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-200 opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-200 opacity-25 blur-3xl" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-heading text-6xl font-bold md:text-7xl lg:text-8xl leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-pink-400">
                About
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-body text-lg text-gray-500 max-w-lg mx-auto leading-relaxed"
          >
            The story behind <strong className="text-pink-600">You and Me</strong> — the platform, the team, and how it was built.
          </motion.p>

          {/* animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ transformOrigin: "center" }}
            className="mx-auto mt-5 h-0.5 w-40 rounded-full bg-gradient-to-r from-transparent via-pink-400 to-transparent"
          />

          {/* jump links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {JUMP_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.35 }}
                whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(219,39,119,0.18)" }}
                className="flex items-center gap-1.5 rounded-full border-2 border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-50 hover:border-pink-400 transition-colors"
              >
                <span>{link.emoji}</span>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <About2 />
    </div>
  );
}
