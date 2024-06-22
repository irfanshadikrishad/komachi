import { useAuth } from "../store/auth";
import styles from "../styles/player.module.css";

export default function Episodes({
  unicornEpisodes,
  getStreamLink,
  animeId,
  malId,
  currentEpisode,
}) {
  const { getSkipTime } = useAuth();

  return (
    <div className={styles.streamingV2Buttons}>
      {unicornEpisodes.map(({ id, title, number }, index) => {
        return (
          <button
            onClick={() => {
              getStreamLink(id);
              getSkipTime(number, malId);
              localStorage.setItem(animeId, id);
            }}
            key={index}
            className={styles.streamingV2Button}
            style={{
              backgroundColor: currentEpisode === id && "var(--primary)",
            }}
          >
            {title ? title : `Episode ${number}`}
          </button>
        );
      })}
    </div>
  );
}
