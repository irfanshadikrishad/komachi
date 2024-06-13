import { Link } from "react-router-dom";
import styles from "../styles/player.module.css";
import { useAuth } from "../store/auth";

export default function Recommendations({ recommendations }) {
  const { defaultPoster } = useAuth();

  return (
    <section className={styles.recommendations}>
      {recommendations && recommendations.length > 0 && (
        <h1>Recommendations</h1>
      )}
      <div className={styles.recommendations_list}>
        {recommendations &&
          recommendations.map(({ title, image, id, type, episodes }, index) => {
            return (
              <Link
                to={`/streaming/${id}`}
                key={index}
                className={styles.recommendations_individual}
              >
                <img
                  className={styles.recommendations_image}
                  src={image}
                  alt={title.english}
                  draggable="false"
                  onError={(e) => {
                    e.target.src = defaultPoster;
                  }}
                />
                <p className="topAiringTitle">
                  {title.english ? title.english : title.romaji}
                </p>
                <section className={styles.recommendations_info}>
                  <p>{`EP ${episodes} • ${type}`}</p>
                </section>
              </Link>
            );
          })}
      </div>
    </section>
  );
}
