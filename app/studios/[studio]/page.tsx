"use client"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import cardio from "@/styles/cardio.module.css"
import { getTitle } from "@/utils/helpers"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
// Skeleton
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

type Anime = {
  _id: string
  title: {
    english?: string
    native?: string
    romaji?: string
    userPreffered?: string
  }
  genres: [string]
  poster: string
  sub_episodes: [{}]
  dub_episodes: [{}]
  totalEpisodes: number
  isAdult: string
  anilistId: string
}

export default function Studio() {
  const { studio } = useParams()
  const [studioAnimes, setStudioAnimes] = useState([])

  async function getStudioAnimes() {
    try {
      const request = await fetch(`/api/studios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studio }),
      })
      const response = await request.json()

      if (request.status === 200) {
        setStudioAnimes(response.data)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (studio) getStudioAnimes()
  }, [studio])

  return (
    <>
      <Navbar />
      <section className="container">
        <section className={cardio.cardsContainer}>
          {studioAnimes.length > 0
            ? studioAnimes.map((std: Anime, idx: number) => {
                return (
                  <Card
                    key={idx}
                    id={std.anilistId}
                    image={std.poster}
                    title={getTitle(std.title)}
                    subCount={std.sub_episodes.length}
                    dubCount={std.dub_episodes.length}
                    totalCount={std.totalEpisodes}
                    isAdult={std.isAdult}
                  />
                )
              })
            : Array.from({ length: 20 }).map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    height={273}
                    baseColor="var(--secondary)"
                    highlightColor="var(--background)"
                  />
                )
              })}
        </section>
      </section>
      <Footer />
    </>
  )
}
