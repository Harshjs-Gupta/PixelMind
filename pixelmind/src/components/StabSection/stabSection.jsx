"use client";
import Image from "next/image";
import React, { useRef } from "react";
import baby from "@/assets/images/baby.jpg";
import camera from "@/assets/images/camera.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const buttonCss =
  "flex h-10 w-[105px] items-center justify-center text-sm  rounded-full font-semibold hover:text-yellow-700";

export default function StabSection() {
  const ref = useRef(null); // Reference for the element to observe
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div className="relative top-5 mt-20 flex h-full flex-col items-center justify-center gap-10 sm:top-32">
      <h1 className="text-3xl font-semibold sm:text-5xl">Stunning Quality</h1>
      <div className="flex w-[100vw] flex-col gap-5">
        <motion.p
          ref={ref}
          className="flex items-center justify-center gap-5 overflow-scroll sm:gap-10 sm:overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <button className={buttonCss}>People</button>
          <button className={buttonCss}>Products</button>
          <button className={buttonCss}>Animals</button>
          <button className={buttonCss}>Cars</button>
          <button className={buttonCss}>Graphics</button>
        </motion.p>
      </div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* <Image src={baby} alt="baby" className="h-[540px] w-[960px] rounded-3xl" /> */}
        <Image
          src={camera}
          alt="camera"
          className="h-72 w-80 rounded-3xl border border-gray-300 sm:h-[540px] sm:w-[960px]"
        />
        {/* <Image
        src={baby}
        alt="baby"
        className="h-[540px] w-[960px] rounded-3xl border-2 border-gray-300"
      /> */}
      </motion.div>
    </div>
  );
}
