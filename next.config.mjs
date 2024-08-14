/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      { hostname: "s4.anilist.co" },
      { hostname: "cdn.myanimelist.net" },
    ],
  },
};

export default nextConfig;
