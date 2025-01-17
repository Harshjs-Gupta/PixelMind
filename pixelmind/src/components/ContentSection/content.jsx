"use client";
import Image from "next/image";
import handImg from "@/assets/images/img1.png"; // Use public folder for assets
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function Content() {
  const ref = useRef(null); // Reference for the element to observe
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div className="relative top-20 flex h-screen w-[100vw] flex-col items-center gap-20 sm:top-60 sm:w-full sm:flex-row">
      <div className="flex flex-col items-center justify-center gap-5">
        <motion.p
          className="flex w-96 flex-col gap-2 font-poppinsBold text-xl sm:w-[450px] sm:text-3xl"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <span>
            Remove backgrounds 100% automatically in 5 seconds with one click
          </span>
        </motion.p>
        <motion.p
          className="w-96 sm:w-[450px]"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          Thanks to remove.bg's clever AI, you can slash editing time - and have
          more fun!
        </motion.p>
        <motion.p
          className="w-96 sm:w-[450px]"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          No matter if you want to make a background transparent (PNG), add a
          white background to a photo,
          <span className="text-gray-500">
            extract or isolate the subject, or get the cutout of a photo
          </span>
          - you can do all this and more with remove.bg, the AI background
          remover for professionals.
        </motion.p>
      </div>
      <motion.div
        ref={ref}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <Image
          src={handImg}
          alt="hand"
          width={384}
          height={384}
          className="h-72 w-72 sm:h-96 sm:w-96"
        />
      </motion.div>
    </div>
  );
}

export default Content;
