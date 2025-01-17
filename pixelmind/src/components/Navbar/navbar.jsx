"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/logo/Pixelmind.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navButton =
  "h-10 rounded-full p-2 text-[16px] hover:bg-[rgb(69, 69, 69)] font-medium transition-colors duration-300";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [isDark, setDark] = useState("");
  const router = useRouter();

  const goToLoginPage = () => {
    router.push("/login-page");
    console.log("login page");
  };
  const goToSignUpPage = () => {
    router.push("/sign-up-page");
  };

  return (
    <>
      {isDark}
      <motion.header
        className="navShadow fixed z-20 flex h-16 w-[100vw] items-center justify-between bg-white/95 px-5 sm:w-full"
        initial={{ transform: "translateY(-100%)" }}
        animate={{ transform: "translateY(0)" }}
        transition={{ duration: 1 }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={"/"}>
              <div className="flex items-end justify-center">
                <Image src={logo} alt="logo" className="h-10 w-10" />
                <span className="text-xl font-semibold text-[#737373] sm:text-3xl">
                  ixel<span className="text-[#A7A6A7]">Mind</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-10 sm:flex">
            <button className={navButton}>Remove Background</button>
            <button className={navButton}>Features</button>
            <button className={navButton}>For Business</button>
            <button className={navButton}>Pricing</button>
          </div>

          <button
            onClick={() => {
              const isDarkMode = document.body.classList.toggle("dark");
              setDark(isDarkMode);
            }}
            className={`${navButton}`}
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu
              className="rounded-md p-2 text-2xl hover:bg-[#f1f1f1]"
            >
              ☰
            </button>
          </div>

          {/* Login and Sign Up */}
          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/login-page"
              className="text-[16px] font-[600] hover:text-[#737373] active:text-[#A7A6A7]"
            >
              Log in
            </Link>
            <Link
              href="/sign-up-page"
              className="flex h-12 w-28 items-center justify-center rounded-full bg-gray-500/20 text-[16px] font-[600] active:bg-gray-500/30"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.header>
      {/* Mobile Menu (only appears when isMenuOpen is true) */}
      {isMenuOpen && (
        <motion.div
          className="absolute left-0 top-16 z-10 w-full bg-white/90 py-4 shadow-lg sm:hidden dark:bg-[#181a1b] dark:text-[#bcb7ae]"
          initial={{ transform: "translateY(-500px)", opacity: 0 }}
          animate={isMenuOpen && { transform: "translateY(0)", opacity: 1 }}
          exit={
            isMenuOpen
              ? { transform: "translateY(-500px)", opacity: 0 }
              : { transform: "translateY(0)", opacity: 1 }
          }
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-4">
            <button className={`${navButton} dark:text-[#bcb7ae]`}>
              Remove Background
            </button>
            <button className={`${navButton} dark:text-[#bcb7ae]`}>
              Features
            </button>
            <button className={`${navButton} dark:text-[#bcb7ae]`}>
              For Business
            </button>
            <button className={`${navButton} dark:text-[#bcb7ae]`}>
              Pricing
            </button>

            {/* Added Login and Sign Up in mobile menu */}
            <Link
              href="/login-page"
              className="text-[16px] font-[600] text-[#54616C] dark:text-[#bcb7ae]"
            >
              Log in
            </Link>
            <Link
              href="/sign-up-page"
              className="flex h-12 w-28 items-center justify-center rounded-full bg-[#EDF0F2] text-[16px] font-[600] text-[#54616C] dark:bg-[#2C2C2C] dark:text-[#bcb7ae]"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
