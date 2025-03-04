import "@/app/globals.css"
import { removeHtmlAndMarkdown } from "@/utils/helpers"
import type { Metadata } from "next"

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
      `Watch ${data?.info?.anime?.info?.name || "?"} online in HD - No Ads • Komachi (こまち)` ||
      "Komachi (こまち) • Heaven for anime lovers",
    description:
      `Stream and Watch ${
        data?.info?.anime?.info?.name || "?"
      } online on Komachi. ${removeHtmlAndMarkdown(data?.info?.anime?.info?.description || "?")}` ||
      "Your premium destination for watching animes online without ads.",
    openGraph: {
      title:
        `Watch ${data?.info?.anime?.info?.name || "?"} online in HD - No Ads • Komachi` ||
        "Komachi (こまち) • Heaven for anime lovers",
      description:
        `Stream and Watch ${
          data?.info?.anime?.info?.name || "?"
        } online on Komachi (こまち). ${removeHtmlAndMarkdown(
          data?.info?.anime?.info?.description || "?"
        )}` ||
        "Your premium destination for watching animes online without ads.",
      images: [
        {
          url: data?.info?.anime?.info?.poster || "?",
          width: 1200,
          height: 630,
          alt: `Stream and Watch ${data?.info?.anime?.info?.name || "?"} online in HD • Komachi`,
        },
      ],
      type: "video.tv_show",
      url: `${process.env.BASE_URL}/watch/${data?.info?.anime?.info?.id || "?"}`,
    },
  }
}

export default async function RootLayout(props: LayoutProps) {
  const { children } = props

  return children
}
