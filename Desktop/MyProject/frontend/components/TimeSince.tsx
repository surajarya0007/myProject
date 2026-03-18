"use client";

import { useState, useEffect } from "react";
import { WEDDING_DATE } from "../constants";

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function getElapsed() {
  const diff = Math.max(0, Date.now() - WEDDING_DATE.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);
  return { days, hours, minutes, seconds };
}

const CELLS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Minutes" },
  { key: "seconds" as const, label: "Seconds" },
];

export default function TimeSince() {
  const [elapsed, setElapsed] = useState(getElapsed());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-heading text-lg italic text-purple-700 md:text-xl">
        We&apos;ve been married for&hellip;
      </p>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {CELLS.map(({ key, label }) => (
          <div
            key={key}
            className="flex min-w-[72px] flex-col items-center rounded-2xl border border-pink-200 bg-gradient-to-t from-red-50 to-purple-50 px-4 py-3 shadow-lg shadow-pink-100 backdrop-blur-sm sm:min-w-[88px] sm:px-6 sm:py-4"
          >
            <span className="font-heading text-3xl font-semibold text-pink-700 sm:text-4xl">
              {mounted ? pad(elapsed[key]) : "00"}
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-gray-500">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
