"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiGooglecloud,
} from "react-icons/si";

/* ─────────────────────────────── data ─────────────────────────────── */

const FRONTEND = [
  { icon: <SiNextdotjs size={40} />, name: "Next.js 14", desc: "React Framework", hex: "#000000", glow: "rgba(0,0,0,0.15)" },
  { icon: <SiReact size={40} />, name: "React 18", desc: "UI Library", hex: "#61DAFB", glow: "rgba(97,218,251,0.25)" },
  { icon: <SiTypescript size={40} />, name: "TypeScript", desc: "Type Safety", hex: "#3178C6", glow: "rgba(49,120,198,0.25)" },
  { icon: <SiTailwindcss size={40} />, name: "Tailwind CSS", desc: "Styling", hex: "#38BDF8", glow: "rgba(56,189,248,0.25)" },
  { icon: <SiFramer size={40} />, name: "Framer Motion", desc: "Animations", hex: "#d946ef", glow: "rgba(217,70,239,0.25)" },
];

const BACKEND = [
  { icon: <SiNodedotjs size={40} />, name: "Node.js", desc: "Runtime", hex: "#539E43", glow: "rgba(83,158,67,0.25)" },
  { icon: <SiExpress size={40} />, name: "Express.js", desc: "API Server", hex: "#404040", glow: "rgba(64,64,64,0.15)" },
  { icon: <SiMongodb size={40} />, name: "MongoDB", desc: "Database", hex: "#10AA50", glow: "rgba(16,170,80,0.25)" },
  { icon: <SiJsonwebtokens size={40} />, name: "JWT", desc: "Auth Tokens", hex: "#d13f7c", glow: "rgba(209,63,124,0.25)" },
  { icon: <SiGooglecloud size={40} />, name: "Google APIs", desc: "Cloud Storage", hex: "#ea4335", glow: "rgba(234,67,53,0.25)" },
];

const STEPS = [
  { step: "01", title: "Browse Events", desc: "See the full wedding schedule — Haldi, Sangeet, Mehndi and the main ceremony.", icon: "📅" },
  { step: "02", title: "View the Gallery", desc: "Explore photos uploaded by family and friends from the wedding days.", icon: "🖼️" },
  { step: "03", title: "Upload Memories", desc: "Log in to upload your own photos and become part of the wedding album.", icon: "📸" },
];

const TEAM = [
  {
    name: "Suraj Arya",
    role: "Full Stack Developer",
    detail: "Built the entire platform — frontend, backend, and deployment.",
    initials: "SA",
  },
];

const PRIVACY = [
  { label: "Data collected", value: "Only your name, email address, and any photos you choose to upload are stored." },
  { label: "Purpose", value: "Information is used solely to manage this wedding album and allow guests to log in and share photos." },
  { label: "Photo storage", value: "Uploaded photos are stored securely and are only accessible to logged-in guests." },
  { label: "No third-party sharing", value: "Your data is never sold or shared with any third party." },
  { label: "Contact", value: "For any privacy concerns, email aryasuraj351@gmail.com." },
];

/* ───────────────────────── animation helpers ───────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

const fadeScale = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

/* ─────────────────────── section heading helper ────────────────────── */

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <motion.div {...fadeUp()} className="mb-12 text-center">
      <h2 className="font-heading text-4xl font-semibold md:text-5xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
          {children}
        </span>
      </h2>
      {sub && <p className="mt-2 text-gray-500 font-body">{sub}</p>}
      <div className="mx-auto mt-4 h-0.5 w-28 rounded-full bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
    </motion.div>
  );
}

/* ────────────────────────── tech card ─────────────────────────────── */

function TechCard({ tech, i }: { tech: typeof FRONTEND[0]; i: number }) {
  return (
    <motion.div
      {...fadeScale(i * 0.07)}
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-pink-100 bg-white px-5 py-6 shadow-md cursor-default select-none"
      style={{ boxShadow: `0 4px 24px ${tech.glow}` }}
    >
      {/* glow ring on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 0 2px ${tech.hex}40, 0 8px 32px ${tech.glow}` }}
      />
      <span style={{ color: tech.hex }} className="relative z-10 drop-shadow-sm">
        {tech.icon}
      </span>
      <div className="relative z-10 text-center">
        <p className="font-heading text-sm font-bold text-gray-800 leading-tight">{tech.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{tech.desc}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── main component ────────────────────────── */

export default function About2() {
  return (
    <div className="w-full">

      {/* ══ ABOUT ══════════════════════════════════════════════════════ */}
      <section id="about" className="relative overflow-hidden py-20 px-6">
        {/* blob decorations */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-purple-200 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-pink-200 opacity-20 blur-3xl" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 sm:flex-row sm:gap-14">
          <motion.div
            {...fadeScale(0)}
            className="shrink-0 rounded-3xl border-2 border-pink-200 bg-white p-5 shadow-2xl shadow-pink-100"
          >
            <Image src="/you-and-me-logo.png" alt="You and Me logo" width={240} height={120} className="rounded-xl" />
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5 text-left">
            <h3 className="font-heading text-3xl font-semibold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-500">
                What is You and Me?
              </span>
            </h3>
            {[
              "This site was built as a digital wedding invitation for a special family celebration. Guests were invited to browse events, view the gallery, and upload their own photos and memories.",
              "There is no limit on uploads. Every photo shared by a guest becomes part of the virtual wedding album — a living memory for the bride and groom.",
              "To upload your own photos, simply log in and visit the Upload page.",
            ].map((text, i) => (
              <motion.p key={i} {...fadeUp(0.15 + i * 0.08)} className="text-gray-600 leading-relaxed">
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* section divider */}
      <div className="mx-auto max-w-4xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" /></div>

      {/* ══ GUIDE ══════════════════════════════════════════════════════ */}
      <section id="guide" className="relative overflow-hidden py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 bg-pink-100/60 rounded-full opacity-60 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeading sub="Three simple steps to make the most of this site">How to Use</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                {...fadeUp(i * 0.12)}
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(219,39,119,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50 p-6 shadow-md"
              >
                {/* big faded step number in background */}
                <span className="pointer-events-none absolute right-4 top-2 font-heading text-7xl font-bold text-pink-100 select-none">
                  {s.step}
                </span>
                <div className="relative z-10">
                  <span className="text-3xl">{s.icon}</span>
                  <h4 className="mt-3 font-heading text-xl font-semibold text-gray-800">{s.title}</h4>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* section divider */}
      <div className="mx-auto max-w-4xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" /></div>

      {/* ══ TECH STACK ════════════════════════════════════════════════ */}
      <section id="tech" className="relative overflow-hidden py-20 px-6">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-purple-200 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-pink-200 opacity-20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <SectionHeading sub="The technologies powering this wedding platform">Built With</SectionHeading>

          {/* Frontend row */}
          <motion.div {...fadeUp(0)} className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200" />
            <span className="rounded-full border border-pink-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-pink-500 shadow-sm">
              Frontend
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-200" />
          </motion.div>
          <div className="mb-10 grid grid-cols-3 gap-4 sm:grid-cols-5">
            {FRONTEND.map((tech, i) => <TechCard key={tech.name} tech={tech} i={i} />)}
          </div>

          {/* Backend row */}
          <motion.div {...fadeUp(0.1)} className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-200" />
            <span className="rounded-full border border-purple-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-purple-500 shadow-sm">
              Backend
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-200" />
          </motion.div>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
            {BACKEND.map((tech, i) => <TechCard key={tech.name} tech={tech} i={i + 5} />)}
          </div>
        </div>
      </section>

      {/* section divider */}
      <div className="mx-auto max-w-4xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" /></div>

      {/* ══ TEAM ══════════════════════════════════════════════════════ */}
      <section id="team" className="relative overflow-hidden py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(253,164,175,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeading sub="The person who brought this to life">Our Team</SectionHeading>
          <div className="flex flex-wrap justify-center gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeScale(i * 0.1)}
                whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(219,39,119,0.15)" }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group relative flex flex-col items-center gap-5 rounded-3xl border-2 border-pink-100 bg-gradient-to-b from-pink-50 to-purple-50 px-10 py-9 shadow-lg text-center max-w-xs"
              >
                {/* animated gradient ring on avatar */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-60 blur-sm group-hover:opacity-90 transition-opacity" />
                  <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-heading text-3xl font-bold shadow-lg">
                    {member.initials}
                  </div>
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-gray-800">{member.name}</p>
                  <span className="mt-1 inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-0.5 text-xs font-semibold text-white shadow-sm">
                    {member.role}
                  </span>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{member.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* section divider */}
      <div className="mx-auto max-w-4xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" /></div>

      {/* ══ PRIVACY ═══════════════════════════════════════════════════ */}
      <section id="privacy" className="relative overflow-hidden py-20 px-6 pb-28">
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-pink-200 opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <SectionHeading sub="How we handle your data">Privacy Policy</SectionHeading>
          <div className="space-y-4">
            {PRIVACY.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.08)}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex gap-4 rounded-2xl border border-pink-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-pink-200 transition-all"
              >
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                <div>
                  <p className="font-heading text-sm font-semibold text-gray-800">{item.label}</p>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
