import { ResponsiveVideoIframe } from "responsive-video-iframe";
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
          <ResponsiveVideoIframe
            width="100%"
            height="auto"
            url={currentEpisode.episodeUrl}
            title={currentEpisode.id}
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
        <Disqus
          url={currentEpisode.episodeUrl}
          currentEpisode={currentEpisode.id}
        />
      )}
    </section>
  );
}
