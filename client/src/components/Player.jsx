import ReactPlayer from "react-player";
import styles from "../styles/Player.module.css";
import { useEffect, useState, useRef } from "react";
import Disqus from "./Disqus";
import { convertTimestampToReadable } from "../utils/info_modifier";
import Episodes from "./Episodes";
// ICONS
import { ImCloudDownload } from "react-icons/im";
import { FiPlayCircle } from "react-icons/fi";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { IoMic } from "react-icons/io5";
import { useAuth } from "../store/auth";

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
  const { skipTime } = useAuth();
  const react_player = useRef();

  const nativeChecker = () => {
    const extension = String(streamLink).slice(-5);
    if (extension !== ".m3u8") {
      setIsNotNative(false);
    } else {
      setIsNotNative(true);
    }
  };

  // SKip on Intro and Outro
  // setInterval(() => {
  //   if (
  //     react_player.current.player.isPlaying &&
  //     react_player.current.getCurrentTime() === skipTime[0].interval.startTime
  //   ) {
  //     react_player.current.seekTo(skipTime[0].interval.endTime);
  //   } else if (
  //     react_player.current.isPlaying &&
  //     react_player.current.getCurrentTime() === skipTime[1].interval.startTime
  //   ) {
  //     react_player.current.seekTo(skipTime[1].interval.endTime);
  //   }
  // }, 3000);

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
              ref={react_player}
              width="100%"
              height={isNotNative ? "auto" : "400px"}
              controls={true}
              playing={false}
              url={streamLink}
              // light={true}
            />
          </div>
        )}
        <section className={styles.ctrls}>
          <div className={styles.ctrl}>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">autoplay</label>
          </div>
        </section>
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
