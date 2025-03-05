"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Player from "@/components/Player"
import styles from "@/styles/watch.module.css"
import { AnimeInfo, extractDefaultSource, isZoroId } from "@/utils/helpers"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Streaming() {
  const params = useParams()
  const animeId = params.id
  const eps = useSearchParams().get("eps")
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>()
  const [episodes, setEpisodes] = useState<any>([])
  const [streamLink, setStreamLink] = useState<string | null>(null)
  const [dubLink, setDubLink] = useState<string | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<string>()
  const [episodeDownloadLink, setEpisodeDownloadLink] = useState("")
  const [sources, setSources] = useState([])
  const [dubEpisodes, setDubEpisodes] = useState([])
  const [nextAiringTime, setNextAiringTime] = useState({})
  const [notFound, setNotFound] = useState(false)

  const getStreamLink = async (subEpisodeId: string, dubEpisodeId?: string) => {
    try {
      if (subEpisodeId && subEpisodeId !== "undefined") {
        const request = await fetch(`/api/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subEpisodeId,
            dubEpisodeId: dubEpisodeId ? dubEpisodeId : null,
          }),
        })
        const response = await request.json()

        if (request.status === 200) {
          setStreamLink(
            String(extractDefaultSource(response?.subLink?.sources))
          )
          if (extractDefaultSource(response?.subLink?.sources)?.length === 0) {
            setStreamLink(null)
            setDubLink(null)
          }
          if (response?.dubLink !== null) {
            setDubLink(String(extractDefaultSource(response?.dubLink?.sources)))
          } else {
            setDubLink(null)
          }
          setCurrentEpisode(subEpisodeId)
          setEpisodeDownloadLink(response.subLink.download)
        } else {
          console.log(response)
          setStreamLink(null)
          setDubLink(null)
        }
      }
    } catch (error) {
      console.error("Error fetching stream link:", error, subEpisodeId)
    }
  }

  async function getZoroSources(episodeId: string) {
    try {
      const request = await fetch(`/api/zoro/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ episodeId }),
      })
      const response = await request.json()
      console.log(response)
      if (request.status === 200) {
        setStreamLink(String(extractDefaultSource(response.sources)))
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAnimeInfo = async () => {
    try {
      if (isZoroId(String(animeId))) {
        const request = await fetch(`/api/zoro/info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: animeId }),
        })
        const response = await request.json()
        console.log(response)
        if (request.status === 200) {
          setAnimeInfo(response)
          setEpisodes(response.episodes)
          setCurrentEpisode(response.episodes[0].id)
          getZoroSources(response.episodes[0].id)
        } else {
          console.log(response)
        }
      } else {
        const request = await fetch(`/api/info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animeId }),
        })
        const response = await request.json()

        if (request.status === 200) {
          setNextAiringTime(response?.nextAiringEpisode)
          setAnimeInfo(response)
          setEpisodes(
            response?.sub_episodes.length > 0
              ? response?.sub_episodes
              : response?.dub_episodes
          )
          setDubEpisodes(response?.dub_episodes)
          setCurrentEpisode(
            response?.sub_episodes[0]?.id
              ? response?.sub_episodes[0]?.id
              : response?.dub_episodes[0]?.id
          )
          if (response?.sub_episodes[0]?.id) {
            getStreamLink(
              eps
                ? response?.sub_episodes[Number(eps) - 1]?.id
                : response?.sub_episodes[0]?.id,
              eps
                ? response?.dub_episodes[Number(eps) - 1]?.id
                : response?.dub_episodes[0]?.id
            )
          } else if (response?.dub_episodes[0]?.id) {
            getStreamLink(
              eps
                ? response?.dub_episodes[Number(eps) - 1]?.id
                : response?.dub_episodes[0]?.id
            )
          }
        } else {
          console.log(response)
          setNotFound(true)
        }
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
