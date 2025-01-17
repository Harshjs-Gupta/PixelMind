import Image from "next/image";
import React from "react";
import free from "@/assets/images/free.png";

export default function VideoContainer() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-5 sm:items-start">
      <video
        src="https://sb.kaleidousercontent.com/67418/x/9289c7b8dd/manuel_compressed.mp4"
        autoPlay
        muted
        className="h-72 w-80 rounded-xl sm:h-[300px] sm:w-[450px]"
      ></video>
      <p className="flex flex-col text-4xl sm:text-6xl">
        <span className="font-semibold">Remove Image</span>
        <span className="font-semibold">Background</span>
      </p>
      <div className="flex gap-2">
        <span className="font-sans text-2xl font-semibold">
          100% Automatically and
        </span>
        <Image src={free} alt="free" className="h-8 w-16" />
      </div>
    </div>
  );
}
