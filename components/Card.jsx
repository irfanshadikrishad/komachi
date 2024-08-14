import Link from "next/link";
import styles from "@/styles/search.module.css";
import { slisor } from "@/utils/workers";

export default function Card({
  id,
  image,
  title,
  subCount,
  dubCount,
  isAdult,
}) {
  return (
    <Link
      href={`/watch/${id}`}
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
          ? title.english.length > 100
            ? slisor(String(title.english), 100)
            : title.english
          : title.romaji.length > 100
          ? slisor(String(title.romaji), 100)
          : title.romaji}
      </p>

      <div className={styles.tags}>
        <p className={styles.tag}>
          {subCount ? `EPS ${subCount}` : `EPS ${dubCount}`}
        </p>
        {isAdult === "true" && (
          <p className={`${styles.tag} ${styles.adult}`}>18+</p>
        )}
      </div>
    </Link>
  );
}
