"use client";
import styles from "@/styles/player.module.css";
import { useEffect, useState } from "react";
import Disqus from "@/components/Disqus";
import {
  convertTimestampToReadable,
  episodeIdToEpisodeNumber,
} from "@/utils/helpers";
import Episodes from "@/components/Episodes";
import Automatics from "@/components/Automatics";
// ICONS
import { FaClosedCaptioning } from "react-icons/fa6";
import { IoMic } from "react-icons/io5";
// VIDSTACK
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import Info from "@/components/Info";
import Recommendations from "./Recommendations";

export default function Player({
  streamLink,
  currentEpisode,
  episodeDownloadLink,
  episodes,
  getStreamLink,
  setStreamLink,
  sources,
  animeId,
  malId,
  dubEpisodes,
  nextAiringEpisode,
  animeInfo,
}) {
  const [isSub, setIsSub] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [unicornEpisodes, setUnicornEpisodes] = useState(episodes);

  useEffect(() => {
    setUnicornEpisodes(episodes);
  }, [episodes]);
  return (
    <div>
      <section className={styles.playerTrajectory}>
        <section className={styles.streamingV2_ReactPlayer}>
          <div
            className={styles.player_Wrapper}
            onMouseOver={() => {
              setIsMouseOver(true);
            }}
            onMouseLeave={() => {
              setIsMouseOver(false);
            }}
          >
            <MediaPlayer
              title={`Episode ${episodeIdToEpisodeNumber(currentEpisode)}`}
              src={streamLink}
              load="eager"
              aspectRatio="16/9"
              viewType="video"
              streamType="on-demand"
              logLevel="warn"
              crossOrigin={true}
              playsInline
              storage="storage-key"
              autoPlay={true}
            >
              <MediaProvider />
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
                }}
              ></div>
              <div
                className={styles.ed}
                style={{
                  display: isMouseOver ? "inline" : "none",
                }}
              ></div>
            </section>
          </div>
          <Automatics />
          <div className={styles.external_sources}>
            <div className={styles.es1}>
              <p>
                You are watching Episode
                {` ${episodeIdToEpisodeNumber(currentEpisode)}`}
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
                  <button style={{ color: isSub ? "var(--primary)" : "" }}>
                    Komachi 1
                  </button>
                </div>
              </div>
              <div>
                <p>
                  <IoMic /> DUB
                </p>
                <div>
                  <button style={{ color: !isSub ? "var(--primary)" : "" }}>
                    Komachi 1
                  </button>
                </div>
              </div>
            </div>
          </div>
          {nextAiringEpisode && currentEpisode && (
            <div className={styles.nae}>
              {`🚀 ${convertTimestampToReadable(
                nextAiringEpisode?.airingTime,
                nextAiringEpisode?.episode
              )}`}
            </div>
          )}
        </section>
        <Episodes
          unicornEpisodes={unicornEpisodes}
          getStreamLink={getStreamLink}
          currentEpisode={currentEpisode}
          streamLink={streamLink}
        />
      </section>
      <Disqus url={streamLink} currentEpisode={currentEpisode} />
      <Info animeInfo={animeInfo} />
      <Recommendations
        recommendations={
          animeInfo?.recommendations ? animeInfo?.recommendations : []
        }
      />
    </div>
  );
}
