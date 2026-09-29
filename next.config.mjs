/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // portfolio cá nhân — không cần lint chặn build production
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;