import styles from "@/styles/player.module.css"
import Link from "next/link"

export default function SeasonCard({ id, name, title, isCurrent, poster }) {
  return (
    <Link
      href={`/watch/${id}`}
      style={{
        backgroundColor: isCurrent ? "var(--primary)" : "var(--secondary)",
      }}
      className={styles.seasonCard}>
      <img className={styles.seasonPoster} src={poster} alt={name} />
      <div className={styles.titles}>
        <p className="one_line">{title}</p>
        <p className="one_line">{name}</p>
      </div>
      <div className={styles.gradient}></div>
    </Link>
  )
}
