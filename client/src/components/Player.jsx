import ReactPlayer from "react-player";
import styles from "../styles/Player.module.css";
import { useEffect, useState } from "react";
import { FiPlayCircle } from "react-icons/fi";
import { ImCloudDownload } from "react-icons/im";
import Disqus from "./Disqus";

export default function Player({
  streamLink,
  currentEpisode,
  episodeDownloadLink,
  episodes,
  getStreamLink,
  setStreamLink,
  sources,
  animeId,
}) {
  const [isNotNative, setIsNotNative] = useState(true);

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
            {isNotNative ? (
              <ReactPlayer
                width="100%"
                height="auto"
                controls={true}
                playing={true}
                url={streamLink}
              />
            ) : (
              <iframe
                className="komachi_player"
                src={streamLink}
                allowFullScreen={true}
                width="100%"
                height="auto"
              />
            )}
          </div>
        )}
        <div className={styles.external_sources}>
          <div className={styles.external_sources_1}>
            <p>External Sources</p>
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
          {episodes.map(({ id, title }, index) => {
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
                {title}
              </button>
            );
          })}
        </div>
      </section>
      <Disqus url={streamLink} currentEpisode={currentEpisode} />
    </div>
  );
}
