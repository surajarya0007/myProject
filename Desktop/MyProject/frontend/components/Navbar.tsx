"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence from framer-motion
import { NAV_LINKS } from "../constants";
import Button from "./Button";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <nav className="fixed top-0 left-0 w-full  bg-transparent backdrop-blur-md border-b-2 transition-opacity z-50 lg:rounded-full">
      <div className="flex justify-between lg:items-center items-start px-8">
        <div className="flex">
          <Link href="/">
            <Image
              src="/you-and-me-logo.png"
              width={170}
              height={100}
              alt="Website logo"
            />
          </Link>
        </div>
        <div className="lg:flex hidden space-x-10 text-xl font-serif">
          {NAV_LINKS.map((link, index) => (
            <Link
              className={selectedIndex === index ? 'text-2xl ' : ''}
              href={link.href} 
              key={link.key}
              onClick={()=> {
                setSelectedIndex(index);
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="lg:flex  hidden space-x-3">
          <Button type="button" title="Sign Up" variant="btn_1" />
          <Button type="button" title="Login" variant="btn_2" />
        </div>
        <div className="lg:hidden pt-5" onClick={toggleMenu}>
          <Image src="menu.svg" alt="" width={20} height={20} />
        </div>
      </div>

      {/* Apply animation to the mobile menu using AnimatePresence */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="lg:hidden"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="hidden" // Animation when menu is hidden
          >
            <ul className="flex flex-col items-center py-5 justify-center space-y-24 text-2xl font-serif h-screen">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  className={selectedIndex === index ? "text-4xl" : ""}
                  key={link.key}
                  variants={item}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                >
                  <Link href={link.href} onClick={toggleMenu}>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
