import ReactPlayer from "react-player";
import styles from "../styles/Player.module.css";
import { useEffect, useState } from "react";
import Disqus from "./Disqus";
import { convertTimestampToReadable } from "../utils/info_modifier";
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
  dubEpisodes,
  nextAiringEpisode,
}) {
  const [isNotNative, setIsNotNative] = useState(true);
  const [isSub, setIsSub] = useState(true);
  const [unicornEpisodes, setUnicornEpisodes] = useState(episodes);

  const nativeChecker = () => {
    const extension = String(streamLink).slice(-5);
    if (extension !== ".m3u8") {
      setIsNotNative(false);
    } else {
      setIsNotNative(true);
    }
  };
  useEffect(() => {
    nativeChecker();
  }, [streamLink]);
  return (
    <div>
      <section className={styles.streamingV2_ReactPlayer}>
        {streamLink && (
          <div>
            <div className={styles.streamingV2_ReactPlayerHeader}>
              <p style={{ color: "var(--primary)" }}>{`Episode ${
                String(currentEpisode).split("-")[
                  String(currentEpisode).split("-").length - 1
                ]
              }`}</p>
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
            <ReactPlayer
              width="100%"
              height={isNotNative ? "auto" : "400px"}
              controls={true}
              playing={true}
              url={streamLink}
            />
          </div>
        )}
        <div className={styles.external_sources}>
          <div className={styles.external_sources_1}>
            <p>Source Types</p>
            <section className={styles.source_btns}>
              <button
                onClick={() => {
                  setIsSub(true);
                  setUnicornEpisodes(episodes);
                }}
                style={{ backgroundColor: isSub && "var(--primary)" }}
              >
                <FaRegClosedCaptioning /> sub ({episodes.length})
              </button>
              {dubEpisodes.length > 0 && (
                <button
                  onClick={() => {
                    setIsSub(false);
                    setUnicornEpisodes(dubEpisodes);
                  }}
                  style={{ backgroundColor: !isSub && "var(--primary)" }}
                >
                  <IoMic /> dub ({dubEpisodes.length})
                </button>
              )}
            </section>
            {nextAiringEpisode && (
              <p className={styles.nextAiringEpisode}>
                {convertTimestampToReadable(
                  nextAiringEpisode.airingTime,
                  nextAiringEpisode.episode
                )}
              </p>
            )}
          </div>
          <div className={styles.serverSources}>
            {sources &&
              sources.map(({ url, name }, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setStreamLink(url);
                    }}
                  >
                    <FiPlayCircle /> {name}
                  </button>
                );
              })}
          </div>
        </div>
        <div className={styles.streamingV2Buttons}>
          {unicornEpisodes.map(({ id, title, number }, index) => {
            return (
              <button
                onClick={() => {
                  getStreamLink(id);
                  localStorage.setItem(animeId, id);
                }}
                key={index}
                className={styles.streamingV2Button}
                style={{
                  backgroundColor: currentEpisode === id && "var(--primary)",
                }}
              >
                {title ? title : number}
              </button>
            );
          })}
        </div>
      </section>
      <Disqus url={streamLink} currentEpisode={currentEpisode} />
    </div>
  );
}
