import ReactPlayer from "react-player";
import { ImCloudDownload } from "react-icons/im";
import styles from "../styles/Player.module.css";
import { DiscussionEmbed } from "disqus-react";
import { useState } from "react";

export default function Player({
  streamLink,
  currentEpisode,
  episodeDownloadLink,
  episodes,
  getStreamLink,
}) {
  const [isCommentLoaded, setIsCommentLoaded] = useState(false);

  return (
    <div>
      <section className={styles.streamingV2_ReactPlayer}>
        {streamLink && (
          <div>
            <div className={styles.streamingV2_ReactPlayerHeader}>
              <p>{`Episode ${
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
              height="auto"
              controls={true}
              playing={true}
              url={streamLink}
            />
          </div>
        )}
        <div className={styles.streamingV2Buttons}>
          {episodes.map((episode, index) => {
            return (
              <button
                onClick={() => {
                  getStreamLink(episode.id);
                }}
                key={index}
                className={styles.streamingV2Button}
              >
                {episode.number}
              </button>
            );
          })}
        </div>
      </section>
      <div
        className={styles.disqus}
        style={{ padding: isCommentLoaded ? "15px" : "5px" }}
      >
        {isCommentLoaded ? (
          <DiscussionEmbed
            shortname="komachi-1"
            config={{
              url: streamLink,
              identifier: currentEpisode,
              title: currentEpisode,
            }}
          />
        ) : (
          <p
            onClick={() => {
              setIsCommentLoaded(true);
            }}
            style={{ cursor: "pointer" }}
          >
            Load Comments
          </p>
        )}
      </div>
    </div>
  );
}
