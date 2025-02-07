"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const backgroundOptions = [
  "https://source.unsplash.com/random/600x400",
  "https://www.w3schools.com/css/img_lights.jpg",
  "https://www.w3schools.com/css/img_mountains.jpg",
];

export default function AddingBg() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const processedImage = searchParams.get("processedImage");
  const [canvas, setCanvas] = useState(null);
  const [fabric, setFabric] = useState(null);

  useEffect(() => {
    if (!processedImage) return;

    let fabricCanvas;

    // Dynamically import Fabric.js inside useEffect
    import("fabric").then((fabricModule) => {
      const fabric = fabricModule.fabric; // Ensure Fabric.js is loaded
      setFabric(fabric);

      // Ensure the canvas exists in the DOM before initializing Fabric.js
      setTimeout(() => {
        const canvasElement = document.getElementById("fabricCanvas");
        if (!canvasElement || !fabric) return; // Check if fabric is defined

        fabricCanvas = new fabric.Canvas("fabricCanvas", {
          width: 600,
          height: 400,
        });

        // Load the processed image onto the canvas
        fabric.Image.fromURL(processedImage, (img) => {
          img.scaleToWidth(300);
          img.scaleToHeight(300);
          img.set({ left: 150, top: 50, selectable: true });
          fabricCanvas.add(img);
        });

        setCanvas(fabricCanvas);
      }, 100); // Small delay to ensure the canvas is ready
    });

    return () => {
      if (fabricCanvas) fabricCanvas.dispose(); // Cleanup on unmount
    };
  }, [processedImage]);

  // Function to set background
  const setBackground = (url) => {
    if (!canvas || !fabric) return;

    // Clear existing background image
    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));

    // Load the new background image
    fabric.Image.fromURL(url, (bgImg) => {
      canvas.setBackgroundImage(bgImg, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / bgImg.width,
        scaleY: canvas.height / bgImg.height,
      });

      // Ensure the processed image is still on the canvas
      fabric.Image.fromURL(processedImage, (img) => {
        img.scaleToWidth(300);
        img.scaleToHeight(300);
        img.set({ left: 150, top: 50, selectable: true });
        canvas.add(img);
        canvas.renderAll(); // Ensure the canvas is re-rendered
      });
    });
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h1 className="text-xl font-semibold">Choose a Background</h1>
      // Display the processed image
      {processedImage && (
        <img src={processedImage} alt="Processed" className="mb-4" />
      )}
      <canvas id="fabricCanvas" className="border border-gray-300 shadow-lg" />
      <div className="flex gap-3">
        {backgroundOptions.map((bg, index) => (
          <img
            key={index}
            src={bg}
            alt={`bg-${index}`}
            className="h-20 w-32 cursor-pointer rounded shadow-lg"
            onClick={() => setBackground(bg)}
          />
        ))}
      </div>
      // Change Save & Return button to Download button
      <button
        onClick={() => {
          if (canvas) {
            const combinedImage = canvas.toDataURL({
              format: "png",
              quality: 1.0,
            });
            const link = document.createElement("a");
            link.href = combinedImage;
            link.download = "combined-background-image.png"; // Updated filename
            link.click();
          }
        }}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Download
      </button>
    </div>
  );
}
