import Link from "next/link";
import styles from "@/styles/search.module.css";
import { slisor } from "@/utils/workers";
// Icons
import { FaClosedCaptioning } from "react-icons/fa6";
import { BiSolidMicrophone } from "react-icons/bi";

export default function Card({
  id,
  image,
  title,
  subCount,
  dubCount,
  totalCount,
  isAdult,
}: {
  id: string;
  image: string;
  title: { english: string; romaji: string };
  subCount: string | number;
  dubCount: string | number;
  totalCount: string | number;
  isAdult: string;
}) {
  return (
    <Link href={`/watch/${id}`} className={styles.billboard_Individual}>
      <img
        src={image}
        alt={image}
        className={styles.billboard_Poster}
        draggable={false}
      />
      <p className={styles.billboard_Title}>
        {title.english
          ? String(title.english).length > 100
            ? slisor(String(title.english), 100)
            : title.english
          : String(title.romaji).length > 100
          ? slisor(String(title.romaji), 100)
          : title.romaji}
      </p>

      <div className={styles.tags}>
        <p className={styles.tag}>
          <FaClosedCaptioning />
          {subCount}
        </p>
        {Number(dubCount) > 0 && (
          <p className={styles.tag}>
            <BiSolidMicrophone />
            {dubCount}
          </p>
        )}
        {Number(totalCount) > 0 && (
          <p className={styles.tag}>
            {totalCount < subCount ? subCount : totalCount}
          </p>
        )}
        {isAdult === "true" && (
          <p className={`${styles.tag} ${styles.adult}`}>18+</p>
        )}
      </div>
    </Link>
  );
}
