import styles from "@/styles/navbar.module.css"
import Link from "next/link"

export default function Logo() {
  return (
    <div>
      <Link
        prefetch={true}
        href="/"
        className={styles.text_logo}
        style={{ display: "inline" }}>
        <p>
          (こまち)
          <br />
          Komachi
        </p>
      </Link>
    </div>
  )
}
