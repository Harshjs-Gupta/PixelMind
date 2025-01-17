"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import plus from "@/assets/icon/plus.png";
import brush from "@/assets/icon/brush.png";
import fx from "@/assets/icon/fx.png";

const centerDiv = "flex items-center justify-center";

function RemoveBgContent() {
  const searchParams = useSearchParams();
  const avatarUrl = searchParams.get("avatarUrl");

  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProcessedImage = async () => {
      if (!avatarUrl) {
        setError("No avatar URL provided.");
        return;
      }

      setLoading(true);
      setError("");
      setProcessedImage(null);

      try {
        const response = await fetch("/api/removeBackground", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: avatarUrl }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to remove background.");
        }

        // Convert binary data to Blob URL
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob); // Create a Blob URL for the image
        setProcessedImage(imageUrl);
      } catch (err) {
        setError(
          err.message || "An error occurred while processing the image.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProcessedImage();
  }, [avatarUrl]);

  const handleDownload = () => {
    if (!processedImage) return;

    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "background-removed.png";
    link.click();
  };

  return (
    <div className="relative top-20 flex flex-col items-center gap-5 px-5 py-2">
      <h1 className="text-center text-xl font-semibold">Remove Background</h1>

      <div className="flex flex-col items-center gap-10 sm:flex-row">
        <div>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Uploaded Avatar"
              className="removeBgBorder h-48 w-72 rounded-lg object-contain sm:h-52 sm:w-96"
            />
          ) : (
            <p className="text-gray-500">No avatar provided.</p>
          )}
        </div>

        <div>
          {loading ? (
            <p>Processing image...</p>
          ) : processedImage ? (
            <img
              src={processedImage}
              alt="Background Removed"
              className="removeBgBorder h-48 w-72 rounded-lg object-contain sm:h-52 sm:w-96"
            />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-gray-500">No processed image yet.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-5">
        <div className={`flex items-center gap-2 ${centerDiv}`}>
          <div
            className={`h-12 w-12 cursor-pointer rounded-full border-2 border-gray-200 ${centerDiv}`}
          >
            <Image src={plus} alt="plusIcon" className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer text-xl">Background</span>
            <span
              className={`h-5 w-10 rounded-full bg-[#FFC83E] text-[10px] font-semibold text-[#454545] ${centerDiv}`}
            >
              New
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-2 ${centerDiv}`}>
          <div
            className={`h-12 w-12 cursor-pointer rounded-full border-2 border-gray-200 ${centerDiv}`}
          >
            <Image src={brush} alt="brushIcon" className="h-6 w-6" />
          </div>
          <span className="cursor-pointer text-xl">Erase/Restore</span>
        </div>

        <div className={`flex items-center gap-2 ${centerDiv}`}>
          <div
            className={`h-12 w-12 cursor-pointer rounded-full border-2 border-gray-200 ${centerDiv}`}
          >
            <Image src={fx} alt="effectIcon" className="h-10 w-10" />
          </div>
          <span className="cursor-pointer text-xl">Effect</span>
        </div>

        <button
          onClick={handleDownload}
          disabled={!processedImage}
          className={`downloadBtn h-10 w-72 rounded-full bg-[#0F70E6] sm:w-96 ${centerDiv} ${
            !processedImage ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default function RemoveBg() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoveBgContent />
    </Suspense>
  );
}
