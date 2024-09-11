"use client";
import styles from "@/styles/player.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import Disqus from "@/components/Disqus";
import {
  convertTimestampToReadable,
  episodeIdToEpisodeNumber,
} from "@/utils/helpers";
import Episodes from "@/components/Episodes";
import Automatics from "@/components/Automatics";
// ICONS
import { ImCloudDownload } from "react-icons/im";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { IoMic } from "react-icons/io5";
// Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// VIDSTACK
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

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
}) {
  const [isNotNative, setIsNotNative] = useState(true);
  const [isSub, setIsSub] = useState(true);
  const [unicornEpisodes, setUnicornEpisodes] = useState(episodes);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const react_player = useRef();

  const nativeChecker = useCallback(() => {
    const extension = String(streamLink).slice(-5);
    if (extension !== ".m3u8") {
      setIsNotNative(false);
    } else {
      setIsNotNative(true);
    }
  }, [streamLink]);

  useEffect(() => {
    setUnicornEpisodes(episodes);
  }, [episodes]);

  useEffect(() => {
    nativeChecker();
  }, [streamLink, nativeChecker]);
  return (
    <div>
      <section className={styles.streamingV2_ReactPlayer}>
        <div>
          <div className={styles.streamingV2_ReactPlayerHeader}>
            <p style={{ color: "var(--primary)" }}>
              {currentEpisode ? (
                `Episode ${
                  String(currentEpisode).split("-")[
                    String(currentEpisode).split("-").length - 1
                  ]
                }`
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={150}
                />
              )}
            </p>
            <div className={styles.streaming_options}>
              {episodeDownloadLink ? (
                <a
                  className={styles.streamingV2_Download}
                  href={episodeDownloadLink}
                  target="_blank"
                >
                  Download
                  <span className={styles.streamingV2_DownloadIcon}>
                    {<ImCloudDownload />}
                  </span>
                </a>
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={85}
                />
              )}
            </div>
          </div>
          {streamLink ? (
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
                <DefaultVideoLayout icons={defaultLayoutIcons} />
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
          ) : (
            <Skeleton
              baseColor="var(--background)"
              highlightColor="var(--secondary)"
              height={470}
              style={{ marginBottom: "5px" }}
            />
          )}
        </div>
        <Automatics />
        <div className={styles.external_sources}>
          <div className={styles.external_sources_1}>
            <p>Source Types</p>
            <section className={styles.source_btns}>
              <button
                onClick={() => {
                  setIsSub(true);
                  setUnicornEpisodes(episodes);
                }}
                style={{
                  backgroundColor: isSub
                    ? "var(--primary)"
                    : "var(--secondary)",
                  color: isSub ? "var(--background)" : "var(--color)",
                }}
              >
                <FaRegClosedCaptioning /> sub ({episodes.length})
              </button>
              {dubEpisodes && dubEpisodes.length > 0 && (
                <button
                  onClick={() => {
                    setIsSub(false);
                    setUnicornEpisodes(dubEpisodes);
                  }}
                  style={{
                    backgroundColor: !isSub
                      ? "var(--primary)"
                      : "var(--secondary)",
                    color: !isSub ? "var(--background)" : "var(--color)",
                  }}
                >
                  <IoMic /> dub ({dubEpisodes.length})
                </button>
              )}
            </section>
            {nextAiringEpisode && currentEpisode && (
              <p className={styles.nextAiringEpisode}>
                {convertTimestampToReadable(
                  nextAiringEpisode?.airingTime,
                  nextAiringEpisode?.episode
                )}
              </p>
            )}
          </div>
        </div>
        <Episodes
          getStreamLink={getStreamLink}
          streamLink={streamLink}
          animeId={animeId}
          malId={malId}
          currentEpisode={currentEpisode}
          unicornEpisodes={unicornEpisodes}
        />
      </section>
      <Disqus url={streamLink} currentEpisode={currentEpisode} />
    </div>
  );
}
