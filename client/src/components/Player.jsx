import ReactPlayer from "react-player";
import styles from "../styles/player.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import Disqus from "./Disqus";
import {
  convertTimestampToReadable,
  stringToBoolean,
} from "../utils/info_modifier";
import Episodes from "./Episodes";
import { useAuth } from "../store/auth";
import Automatics from "./Automatics";
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
  const { skipTime, automatics, getSkipTime } = useAuth();
  const [isNotNative, setIsNotNative] = useState(true);
  const [isSub, setIsSub] = useState(true);
  const [unicornEpisodes, setUnicornEpisodes] = useState(episodes);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const react_player = useRef();
  const intervalRef = useRef(null);

  const nativeChecker = useCallback(() => {
    const extension = String(streamLink).slice(-5);
    if (extension !== ".m3u8") {
      setIsNotNative(false);
    } else {
      setIsNotNative(true);
    }
  }, [streamLink]);

  // Calculating the auto-skip durations
  let OP_LEFT, ED_LEFT, OP_WIDTH, ED_WIDTH;
  if (skipTime && skipTime[0]) {
    const duration = skipTime[0].episodeLength;
    const start_Time = skipTime[0].interval.startTime;
    const end_Time = skipTime[0].interval.endTime;
    OP_LEFT = (start_Time / duration) * 100;
    OP_WIDTH = ((end_Time - start_Time) / duration) * 100;
  }
  if (skipTime && skipTime[1]) {
    const duration = skipTime[1].episodeLength;
    const start_Time = skipTime[1].interval.startTime;
    const end_Time = skipTime[1].interval.endTime;
    ED_LEFT = (start_Time / duration) * 100;
    ED_WIDTH = ((end_Time - start_Time) / duration) * 100;
  }

  // For Auto Skip
  const autoSkip = useCallback(() => {
    if (skipTime && stringToBoolean(automatics.skip)) {
      skipTime.forEach((skip_time) => {
        const currentTime = react_player.current.getCurrentTime();
        // console.log(currentTime, skip_time.interval.startTime);
        if (
          currentTime > skip_time.interval.startTime &&
          currentTime < skip_time.interval.endTime
        ) {
          react_player.current.seekTo(skip_time.interval.endTime + 1);
        }
      });
    }
  }, [skipTime, automatics.skip]);

  // For Auto Next
  const autoNext = useCallback(() => {
    if (
      stringToBoolean(automatics.next) &&
      react_player.current?.getCurrentTime() >
        react_player.current?.getDuration() - 5
    ) {
      let splt = currentEpisode?.split("-");
      const nextEpisodeNumber = Number(splt[splt.length - 1]) + 1;
      splt[splt.length - 1] = nextEpisodeNumber;
      const nextEpisodeId = splt.join("-");
      getStreamLink(nextEpisodeId);
      // After auto-skik to next episode, get their skip time
      getSkipTime(nextEpisodeNumber, malId);
    }
  }, [automatics.next, currentEpisode, getStreamLink]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      autoSkip();
      autoNext();
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [autoSkip, autoNext]);

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
                playing={automatics ? stringToBoolean(automatics.play) : false}
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
                    left: ED_LEFT ? `${ED_LEFT}%` : "16px",
                    width: `${Number(ED_WIDTH)}%`,
                  }}
                ></div>
                <div
                  className={styles.ed}
                  style={{
                    display: isMouseOver ? "inline" : "none",
                    left: OP_LEFT ? `${OP_LEFT}%` : "16px",
                    width: `${Number(OP_WIDTH)}%`,
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
                style={{ backgroundColor: isSub && "var(--primary)" }}
              >
                <FaRegClosedCaptioning /> sub ({episodes.length})
              </button>
              {dubEpisodes && dubEpisodes.length > 0 && (
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
            {nextAiringEpisode.length !== 0 && (
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
