import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Komachi (こまち) • Heaven for anime lovers.",
  description:
    "Minimalist anime streaming platform where users can stream or download their favorite anime effortlessly. Built for speed, simplicity, and an immersive experience.",
  openGraph: {
    title: "Komachi (こまち) • Heaven for anime lovers.",
    description:
      "Minimalist anime streaming platform where users can stream or download their favorite anime effortlessly. Built for speed, simplicity, and an immersive experience.",
    url: process.env.BASE_URL,
    siteName: "Komachi (こまち)",
    images: [
      {
        url: "/komachi_og.jpg",
        width: 800,
        height: 600,
        alt: "Komachi (こまち)",
      },
    ],
    locale: "en_US",
    type: "video.tv_show",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics mode="auto" />
        <SpeedInsights />
      </body>
    </html>
  )
}
