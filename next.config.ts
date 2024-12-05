import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for better debugging
  //swcMinify: true,       // Minify the code using SWC for faster builds
};

console.log('Rendering Next file');

export default nextConfig;

