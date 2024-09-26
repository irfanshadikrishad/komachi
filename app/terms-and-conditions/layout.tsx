import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Terms & Conditions of Komachi (こまち) — Komachi (こまち) • Heaven for anime lovers.",
  description: "Terms & Conditions of Komachi (こまち)",
  openGraph: {
    title: "Terms & Conditions of Komachi (こまち)",
    description: "Terms & Conditions of Komachi (こまち)",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
