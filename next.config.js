/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for better debugging
  // swcMinify: true,       // Minify the code using SWC for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
