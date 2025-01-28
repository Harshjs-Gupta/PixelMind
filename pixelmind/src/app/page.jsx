"use client";
import Image from "next/image";
import axios from "axios";
import VideoContainer from "@/components/VideoContainer/videoContainer";
import StabSection from "@/components/StabSection/stabSection";
import Content from "@/components/ContentSection/content";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const images = [
    "https://static.remove.bg/uploader-examples/person/7_thumbnail.jpg",
    "https://static.remove.bg/uploader-examples/animal/6_thumbnail.jpg",
    "https://static.remove.bg/uploader-examples/car/1_thumbnail.jpg",
    "https://static.remove.bg/uploader-examples/product/8_thumbnail.jpg",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // Add state for avatarUrl
  const router = useRouter();

  // Handle file upload
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      uploadImage(file);
    }
  }

  // Upload image to Cloudinary and get the HTTPS URL
  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_custom_preset"); // Replace with your preset name

    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvgq2tz5n/image/upload`,
        formData,
      );
      console.log("Cloudinary Response:", response); // Log the full response
      const cloudinaryUrl = response.data.secure_url;
      setImageUrl(cloudinaryUrl);
      handleImageSubmit(cloudinaryUrl);
    } catch (error) {
      console.error(
        "Image upload failed:",
        error.response ? error.response.data : error,
      );
      alert("Image upload failed. Please try again.");
    } finally {
      setIsLoading(false);
      console.log("Image upload complete");
    }
  }

  // Handle URL input submission
  function handleUrlSubmit() {
    if (avatarUrl) {
      router.push(`/remove-bg?avatarUrl=${encodeURIComponent(avatarUrl)}`);
    } else {
      alert("Please enter a valid image URL.");
    }
  }

  // Handle the image submission, either from URL or uploaded image
  function handleImageSubmit(uploadedUrl) {
    if (uploadedUrl || imageUrl || uploadedImage) {
      const imageToSubmit =
        uploadedUrl || imageUrl || URL.createObjectURL(uploadedImage);
      router.push(`/remove-bg?avatarUrl=${encodeURIComponent(imageToSubmit)}`);
    } else {
      alert("Please select or enter a valid image.");
    }
  }

  return (
    <div className="relative top-5 flex h-full w-full flex-col items-center px-40 pt-5 sm:top-20">
      {isLoading ? (
        <span className="flex items-center justify-center text-3xl font-bold text-[#737373]">
          Image Loading...
        </span>
      ) : (
        <>
          <main className="flex h-full w-[100vw] flex-col sm:w-full sm:flex-row sm:gap-20">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <VideoContainer />
            </motion.div>
            <motion.div
              className="relative top-5 flex flex-col items-center justify-center gap-10 sm:top-32"
              initial={{ transform: "translateX(-100px)", opacity: 0 }}
              animate={{ transform: "translateX(0)", opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="flex-col gap-10 sm:flex">
                <div className="uploadBoxShadow flex h-72 w-80 flex-col items-center justify-center gap-5 rounded-3xl sm:h-80 sm:w-96">
                  <div>
                    {/* File upload input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="h-14 w-80 cursor-pointer rounded-full bg-[#0F70E6] p-2 text-center text-sm font-semibold text-white active:bg-[#0f70e6da]"
                    >
                      Upload Image
                    </label>
                  </div>
                  <span>-------- OR --------</span>
                  {/* Image URL input */}
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    value={avatarUrl}
                    onChange={(e) => {
                      setAvatarUrl(e.target.value);
                      setUploadedImage(null); // Clear the uploaded file when URL is entered
                    }}
                    className="h-12 w-72 rounded-full border border-gray-300 bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F70E6] sm:h-14 sm:w-80"
                  />
                  {/* Submit button for the URL */}
                  <button
                    type="submit"
                    onClick={handleUrlSubmit}
                    className="h-14 w-40 rounded-full bg-[#0F70E6] p-2 font-semibold text-white active:bg-[#0f70e6da]"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="flex w-72 flex-col gap-2 sm:w-[400px]">
                <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                  <p className="flex flex-row gap-2 sm:flex-col sm:gap-0">
                    <span>No image?</span>
                    <span className="w-36">Try one of these:</span>
                  </p>
                  <div className="flex gap-2">
                    {images.map((img, i) => (
                      <Image
                        src={img}
                        alt={`Example image ${i + 1}`}
                        key={i}
                        width={60}
                        height={60}
                        className="cursor-pointer rounded-xl"
                        onClick={() => setAvatarUrl(img)}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[10px]">
                  By uploading an image or URL you agree to our
                  <span className="underline"> Terms of Service</span>. To learn
                  more about how remove.bg handles your personal data, check our
                  <span className="underline"> Privacy Policy</span>.
                </p>
              </div>
            </motion.div>
          </main>
          <StabSection />
          <Content />
        </>
      )}
    </div>
  );
}
