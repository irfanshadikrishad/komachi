"use client"
import Player from "@/components/Player"
import styles from "@/styles/watch.module.css"
import { AnimeInfo } from "@/utils/helpers"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Watch() {
  const params = useParams()
  const animeId = params.id
  const eps = useSearchParams().get("eps")
  const [isClient, setIsClient] = useState(false)
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>()
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState<any>([])
  const [streamLink, setStreamLink] = useState<string | null>(null)
  const [dubLink, setDubLink] = useState<string | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<string>()
  const [episodeDownloadLink, setEpisodeDownloadLink] = useState("")
  const [sources, setSources] = useState([])
  const [dubEpisodes, setDubEpisodes] = useState([])
  const [nextAiringTime, setNextAiringTime] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [episode, setEpisode] = useState({})
  const [VTT, setVTT] = useState([])

  useEffect(() => {
    setIsClient(true) // Set isClient to true after mounting
  }, [])

  const getStreamLink = async (subEpisodeId: string, episode?: any) => {
    setVTT([])
    try {
      if (subEpisodeId && subEpisodeId !== "undefined") {
        const request = await fetch(`/api/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subEpisodeId }),
        })

        const response = await request.json()

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
            setVTT(response.sub.tracks)
          } else {
            console.warn("Sub sources are invalid or unavailable.")
            setStreamLink(null)
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
            setDubLink(null)
          }

          // Set current episode and metadata
          setCurrentEpisode(subEpisodeId)
          setEpisode(episode)
        } else {
          console.error("Failed to fetch stream link:", response)
          setStreamLink(null)
          setDubLink(null)
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

      if (request.status === 200) {
        setAnimeInfo(response.info.anime)
        setSeasons(response.info.seasons)
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
    if (isClient) {
      window.scrollTo({ top: 0 })
    }
  }, [animeId, eps, isClient])

  if (!isClient) return null // Prevent SSR issues

  return (
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
            animeInfo={animeInfo}
            seasons={seasons}
            episode={episode}
            vtt={VTT}
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
  )
}
