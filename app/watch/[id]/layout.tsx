import "@/app/globals.css"
import { removeHtmlAndMarkdown } from "@/utils/helpers"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params

  const data = await fetch(`${process.env.BASE_URL}/api/info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ animeId: params.id }),
  }).then((res) => res.json())

  return {
    title:
      `Watch ${
        data.title?.english ? data.title?.english : data.title?.romaji
      } online in HD - No Ads • Komachi (こまち)` ||
      "Komachi (こまち) • Heaven for anime lovers",
    description:
      `Stream and Watch ${
        data.title?.english ? data.title?.english : data.title?.romaji
      } online on Komachi. ${removeHtmlAndMarkdown(data.description)}` ||
      "Your premium destination for watching animes online without ads.",
    openGraph: {
      title:
        `Watch ${
          data.title?.english ? data.title?.english : data.title?.romaji
        } online in HD - No Ads • Komachi` ||
        "Komachi (こまち) • Heaven for anime lovers",
      description:
        `Stream and Watch ${
          data.title?.english ? data.title?.english : data.title?.romaji
        } online on Komachi (こまち). ${removeHtmlAndMarkdown(
          data.description
        )}` ||
        "Your premium destination for watching animes online without ads.",
      images: [
        {
          url: data?.poster,
          width: 1200,
          height: 630,
          alt: `Stream and Watch ${
            data.title?.english ? data.title?.english : data.title?.romaji
          } online in HD • Komachi`,
        },
      ],
      type: "video.tv_show",
      url: `${process.env.BASE_URL}/watch/${data?.anilistId}`,
    },
  }
}

export default async function RootLayout(props: LayoutProps) {
  // const params = await props.params

  const { children } = props

  // const metadata = await generateMetadata({ params, children })

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
