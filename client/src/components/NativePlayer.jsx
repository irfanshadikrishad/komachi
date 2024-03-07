import Disqus from "../components/Disqus.jsx";

export default function NativePlayer({
  styles,
  currentEpisode,
  episodes,
  setCurrentEpisode,
}) {
  return (
    <section>
      <section className={styles.player}>
        <p className={styles.episodeInfo}>{`You are watching episode ${
          currentEpisode && currentEpisode.id
        }`}</p>
        {currentEpisode && (
          <iframe
            className="komachi_player"
            src={currentEpisode.url}
            allowFullScreen={true}
            width="100%"
            height="auto"
          />
        )}
        <div className={styles.buttons}>
          {episodes.length > 0 &&
            currentEpisode &&
            episodes.map((episode, index) => {
              return (
                <button
                  className={styles.button}
                  key={index}
                  onClick={() => {
                    setCurrentEpisode(episode);
                  }}
                  style={{
                    backgroundColor:
                      currentEpisode.id === episode.id && "var(--primary)",
                  }}
                >
                  {episode.id}
                </button>
              );
            })}
        </div>
      </section>
      {currentEpisode && (
        <Disqus url={currentEpisode.url} currentEpisode={currentEpisode.id} />
      )}
    </section>
  );
}
