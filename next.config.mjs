/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { hostname: "s4.anilist.co" },
      { hostname: "cdn.myanimelist.net" },
    ],
  },
}

export default nextConfig
