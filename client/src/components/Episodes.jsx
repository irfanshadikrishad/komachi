import styles from "../styles/Player.module.css";

export default function Episodes({
  unicornEpisodes,
  getStreamLink,
  animeId,
  currentEpisode,
}) {
  return (
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
  );
}
