"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import React from "react";
import Button from "./Button";
import AnimatedDiv from "./AnimatedDiv";
import Link from "next/link";
import { getLocalStorgeToken } from "./getToken";

function CTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getLocalStorgeToken();
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section className="bg-transparent py-16 px-8 pb-24">
      <AnimatedDiv>
        <div className="mx-auto max-w-4xl rounded-3xl border border-pink-100 bg-white shadow-xl shadow-pink-100 overflow-hidden">
          {/* Top gradient strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-purple-400 to-pink-400" />
          <div className="flex flex-col items-center gap-8 p-8 sm:flex-row sm:justify-between sm:p-10">
            <div className="flex-1">
              <h2 className="mb-4 font-heading text-2xl font-semibold md:text-4xl lg:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400">
                  Capture Your Wedding Memories Here
                </span>
              </h2>
              <div className="space-x-2">
                {isLoggedIn ? (
                  <Link href="/uplode">
                    <Button type="button" title="Upload" variant="btn_2" />
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button type="button" title="Login" variant="btn_2" icon="" />
                  </Link>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center justify-center">
              <Image src="/CTA.png" alt="" width={280} height={280} className="drop-shadow-md" />
            </div>
          </div>
        </div>
      </AnimatedDiv>
    </section>
  );
}

export default CTA;
