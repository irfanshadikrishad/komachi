import { Link } from "react-router-dom";
import styles from "../styles/search.module.css";

export default function Card({ id, image, title, totalEpisodes }) {
  return (
    <Link
      to={`/streaming/${id}`}
      key={id}
      className={styles.billboard_Individual}
    >
      <img
        src={image}
        alt={image}
        className={styles.billboard_Poster}
        draggable={false}
      />
      <p className={styles.billboard_Title}>
        {title.english
          ? title.english.length > 25
            ? String(title.english).slice(0, 25)
            : title.english
          : title.romaji.length > 25
          ? String(title.romaji).slice(0, 25)
          : title.romaji}
      </p>

      <p className={styles.episode}>
        {totalEpisodes ? `EPS ${totalEpisodes}` : `Upcoming`}
      </p>
    </Link>
  );
}
