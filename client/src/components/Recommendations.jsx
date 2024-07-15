import { Link } from "react-router-dom";
import styles from "../styles/player.module.css";
import { useAuth } from "../store/auth";

export default function Recommendations({ recommendations }) {
  const { defaultPoster } = useAuth();

  return (
    <section className={styles.recommendations}>
      {recommendations && recommendations.length > 0 && (
        <h4>Recommendations</h4>
      )}
      <div className={styles.recommendations_list}>
        {recommendations &&
          recommendations.map(
            ({ title, poster, animeId, format, episodes }, index) => {
              // some might not contain id, this is pre-caution for such cases
              if (animeId) {
                return (
                  <Link
                    to={`/streaming/${animeId}`}
                    key={index}
                    className={styles.recommendations_individual}
                  >
                    <img
                      className={styles.recommendations_image}
                      src={poster}
                      alt={title.english ? title.english : title.romaji}
                      draggable="false"
                      onError={(e) => {
                        e.target.src = defaultPoster;
                      }}
                    />
                    <p className="topAiringTitle">
                      {title.english ? title.english : title.romaji}
                    </p>
                    <section className={styles.recommendations_info}>
                      <p>{`EP ${episodes} • ${format}`}</p>
                    </section>
                  </Link>
                );
              }
            }
          )}
      </div>
    </section>
  );
}
