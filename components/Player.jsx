"use client";
import ReactPlayer from "react-player";
import styles from "@/styles/player.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import Disqus from "@/components/Disqus";
import { convertTimestampToReadable } from "@/utils/helpers";
import Episodes from "@/components/Episodes";
import Automatics from "@/components/Automatics";
// ICONS
import { ImCloudDownload } from "react-icons/im";
import { FiPlayCircle } from "react-icons/fi";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { IoMic } from "react-icons/io5";

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
    nativeChecker();
  }, [streamLink, nativeChecker]);
  return (
    <div>
      <section className={styles.streamingV2_ReactPlayer}>
        {streamLink && (
          <div>
            <div className={styles.streamingV2_ReactPlayerHeader}>
              <p style={{ color: "var(--primary)" }}>
                {currentEpisode
                  ? `Episode ${
                      String(currentEpisode).split("-")[
                        String(currentEpisode).split("-").length - 1
                      ]
                    }`
                  : `No Episodes available!`}
              </p>
              <div className={styles.streaming_options}>
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
              </div>
            </div>
            <div
              className={styles.player_Wrapper}
              onMouseOver={() => {
                setIsMouseOver(true);
              }}
              onMouseLeave={() => {
                setIsMouseOver(false);
              }}
            >
              <ReactPlayer
                ref={react_player}
                width="100%"
                height={isNotNative ? "auto" : "400px"}
                controls={true}
                // playing={automatics ? stringToBoolean(automatics.play) : false}
                playing={true}
                url={streamLink}
                className="react_player"
                style={{ overflow: "hidden" }}
                // light={true}
              />
              <section>
                <div
                  className={styles.ed}
                  style={{
                    display: isMouseOver ? "inline" : "none",
                    right: "16px",
                    // width: `${Number(ED_WIDTH) ? Number(ED_WIDTH) : 0}%`,
                  }}
                ></div>
                <div
                  className={styles.ed}
                  style={{
                    display: isMouseOver ? "inline" : "none",
                    // left: OP_LEFT ? `${OP_LEFT}%` : "16px",
                    // width: `${Number(OP_WIDTH) ? Number(OP_WIDTH) : 0}%`,
                  }}
                ></div>
              </section>
            </div>
          </div>
        )}
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
            {nextAiringEpisode.length !== 0 && (
              <p className={styles.nextAiringEpisode}>
                {convertTimestampToReadable(
                  nextAiringEpisode[0].airingTime,
                  nextAiringEpisode[0].episode
                )}
              </p>
            )}
          </div>
        </div>
        <Episodes
          getStreamLink={getStreamLink}
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
