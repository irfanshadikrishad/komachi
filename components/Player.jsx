"use client"
import Automatics from "@/components/Automatics"
import Disqus from "@/components/Disqus"
import Episodes from "@/components/Episodes"
import Info from "@/components/Info"
import styles from "@/styles/player.module.css"
import {
  convertTimestampToReadable,
  episodeIdToEpisodeNumber,
  originWithEps,
} from "@/utils/helpers"
import { useEffect, useState } from "react"
// ICONS
import { FaClosedCaptioning } from "react-icons/fa6"
import { IoMic } from "react-icons/io5"
// VIDSTACK
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react"
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default"
import "@vidstack/react/player/styles/default/layouts/video.css"
import "@vidstack/react/player/styles/default/theme.css"
import Link from "next/link"

export default function Player({
  streamLink,
  dubLink,
  currentEpisode,
  episodeDownloadLink,
  episodes,
  getStreamLink,
  setStreamLink,
  nextAiringEpisode,
  animeInfo,
  episode,
  vtt,
}) {
  const [isSub, setIsSub] = useState(true)
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [unicornEpisodes, setUnicornEpisodes] = useState(episodes)
  const [origin, setOrigin] = useState("")

  // Use useEffect to handle localStorage on the client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedType = localStorage.getItem("type")

      setIsSub(storedType ? storedType === "Sub" : true)
      if (window.location.href) {
        let o = originWithEps(window.location.href, currentEpisode)
        setOrigin(o)
      }
    }
  }, [dubLink, streamLink])

  useEffect(() => {
    setUnicornEpisodes(episodes)
  }, [episodes])

  useEffect(() => {
    const player = document.querySelector("vds-media-player")
    if (player) {
      player.load()
    }
  }, [streamLink, dubLink])
  console.log(vtt)

  return (
    <div>
      <section className={styles.playerTrajectory}>
        <section className={styles.streamingV2_ReactPlayer}>
          <div
            className={styles.player_Wrapper}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}>
            <MediaPlayer
              title={episode?.title || ""}
              src={`https://goodproxy.goodproxy.workers.dev/fetch?url=${
                isSub || !dubLink ? streamLink : dubLink
              }`}
              load="eager"
              aspectRatio="16/9"
              viewType="video"
              streamType="on-demand"
              logLevel="warn"
              crossOrigin="anonymous"
              playsInline
              storage="storage-key"
              autoPlay>
              <MediaProvider />
              {vtt.map((vT, idx) => {
                return (
                  <Track
                    key={idx}
                    src={vT.file}
                    label={vT.label}
                    kind={vT.kind}
                  />
                )
              })}
              <DefaultVideoLayout
                icons={defaultLayoutIcons}
                download={episodeDownloadLink}
              />
            </MediaPlayer>
            <section>
              <div
                className={styles.ed}
                style={{
                  display: isMouseOver ? "inline" : "none",
                  right: "16px",
                }}></div>
              <div
                className={styles.ed}
                style={{
                  display: isMouseOver ? "inline" : "none",
                }}></div>
            </section>
          </div>
          <Automatics />
          <div className={styles.external_sources}>
            <div className={styles.es1}>
              <p>
                You are watching
                <span className="primary">{` Episode ${episode?.number}`}</span>
              </p>
              <p>
                If current server doesn't work please try other servers beside.
              </p>
            </div>
            <div className={styles.es2}>
              <div>
                <p>
                  <FaClosedCaptioning /> SUB
                </p>
                <div>
                  <button
                    style={{
                      color: isSub || !dubLink ? "var(--primary)" : "",
                    }}
                    onClick={() => {
                      setStreamLink(streamLink)
                      setIsSub(true)
                      localStorage.setItem("type", "true")
                    }}>
                    Komachi 1
                  </button>
                </div>
              </div>
              {dubLink && (
                <div>
                  <p>
                    <IoMic /> DUB
                  </p>
                  <div>
                    <button
                      style={{ color: !isSub ? "var(--primary)" : "" }}
                      onClick={() => {
                        setStreamLink(dubLink)
                        setIsSub(false)
                        localStorage.setItem("type", "false")
                      }}>
                      Komachi 1
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* {nextAiringEpisode && currentEpisode && (
            <div className={styles.nae}>
              {`🚀 ${convertTimestampToReadable(
                nextAiringEpisode?.airingTime,
                nextAiringEpisode?.episode
              )}`}
            </div>
          )} */}
        </section>
        <Episodes
          unicornEpisodes={unicornEpisodes}
          getStreamLink={getStreamLink}
          currentEpisode={currentEpisode}
          streamLink={streamLink}
        />
      </section>
      <section className={styles.playerTrajectory}>
        <div>
          <Disqus url={origin} currentEpisode={currentEpisode} />
          <Info animeInfo={animeInfo} />
        </div>
        <div className={styles.thanks_Main}>
          <p>
            Thanks for watching. Consider subscribing to my{" "}
            <Link
              href="https://www.youtube.com/@irfanshadikrishad"
              target="_blank"
              className={styles.yt}>
              youtube
            </Link>{" "}
            channel.
          </p>
        </div>
      </section>
    </div>
  )
}
