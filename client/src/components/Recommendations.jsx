import styles from "../styles/Player.module.css";
import { useAuth } from "../store/auth";

export default function Recommendations({ recommendations }) {
  const { defaultPoster } = useAuth();

  return (
    <section className={styles.recommendations}>
      <h1>Recommendations</h1>
      <div className={styles.recommendations_list}>
        {recommendations &&
          recommendations.map(
            ({ title, image, status, type, episodes }, index) => {
              return (
                <div key={index} className={styles.recommendations_individual}>
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
                </div>
              );
            }
          )}
      </div>
    </section>
  );
}
