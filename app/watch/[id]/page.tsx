"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Player from "@/components/Player"
import styles from "@/styles/watch.module.css"
import { AnimeInfo, extractDefaultSource } from "@/utils/helpers"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Streaming() {
  const params = useParams()
  const animeId = params.id
  const eps = useSearchParams().get("eps")
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>()
  const [episodes, setEpisodes] = useState<any>([])
  const [streamLink, setStreamLink] = useState("")
  const [dubLink, setDubLink] = useState<string | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<string>()
  const [episodeDownloadLink, setEpisodeDownloadLink] = useState("")
  const [sources, setSources] = useState([])
  const [dubEpisodes, setDubEpisodes] = useState([])
  const [nextAiringTime, setNextAiringTime] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [episode, setEpisode] = useState({})

  const getStreamLink = async (subEpisodeId: string, episode?: any) => {
    try {
      if (subEpisodeId && subEpisodeId !== "undefined") {
        const request = await fetch(`/api/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subEpisodeId }),
        })

        const response = await request.json()
        // console.log(response, subEpisodeId, episode)

        if (request.status === 200) {
          // Validate and set sub link
          if (
            response.sub &&
            Array.isArray(response.sub.sources) &&
            response.sub.sources.length > 0
          ) {
            if (response.sub.sources[0].url) {
              setStreamLink(String(response.sub.sources[0].url))
            } else {
              console.warn("Sub source URL is missing.")
              setStreamLink("")
            }
          } else {
            console.warn("Sub sources are invalid or unavailable.")
            setStreamLink("")
          }

          // Validate and set dub link
          if (
            response.dub &&
            Array.isArray(response.dub.sources) &&
            response.dub.sources.length > 0
          ) {
            if (response.dub.sources[0].url) {
              setDubLink(response.dub.sources[0].url)
            } else {
              console.warn("Dub source URL is missing.")
              setDubLink(null)
            }
          } else {
            console.warn("Dub sources are invalid or unavailable.")
            setDubLink(null)
          }

          // Set current episode and metadata
          setCurrentEpisode(subEpisodeId)
          setEpisode(episode)
        } else {
          console.error("Failed to fetch stream link:", response)
        }
      } else {
        console.warn("Invalid subEpisodeId:", subEpisodeId)
      }
    } catch (error) {
      console.error("Error fetching stream link:", error, subEpisodeId)
    }
  }

  const getAnimeInfo = async () => {
    try {
      const request = await fetch(`/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId }),
      })
      const response = await request.json()
      // console.log(response)

      if (request.status === 200) {
        setAnimeInfo(response.info.anime)
        setEpisodes(response?.episodes?.episodes)
        setCurrentEpisode(response?.episodes?.episodes[0]?.episodeId)
        getStreamLink(
          response?.episodes?.episodes[0]?.episodeId,
          response?.episodes?.episodes[0]
        )
      } else {
        console.log(response)
        setNotFound(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Individual Episode Sources
  const getServerSources = async (episodeId: string) => {
    try {
      const request = await fetch(`/api/sources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeId }),
      })
      const response = await request.json()

      if (request.status === 200) {
        setSources(response)
      } else {
        console.log(response, episodeId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAnimeInfo()
  }, [eps])
  useEffect(() => {
    setDubEpisodes([])
    window.scrollTo({ top: 0 })
  }, [animeId, eps])
  return (
    <>
      <Navbar />
      <section className="container">
        {!notFound ? (
          <section className={styles.watchContainer}>
            <Player
              streamLink={streamLink}
              dubLink={dubLink}
              currentEpisode={currentEpisode}
              episodeDownloadLink={episodeDownloadLink}
              episodes={episodes}
              getStreamLink={getStreamLink}
              setStreamLink={setStreamLink}
              nextAiringEpisode={nextAiringTime}
              animeInfo={animeInfo}
              episode={episode}
            />
          </section>
        ) : (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
            }}>
            <Image
              src={"/not_found.png"}
              alt="not_found image"
              width={300}
              height={280}
              draggable="false"
            />
            <h1>not-found or unavailable</h1>
          </section>
        )}
      </section>
      <Footer />
    </>
  )
}
