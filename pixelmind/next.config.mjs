/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static.remove.bg", "sb.kaleidousercontent.com"],
  },
  experimental: {
    appDir: true,
  },
  // If you're using the src folder structure
  srcDir: "src",
};

export default nextConfig;
