import Link from "next/link";
import styles from "@/styles/navbar.module.css";

export default function Logo() {
  return (
    <div>
      <Link href="/" className={styles.text_logo} style={{ display: "inline" }}>
        <p>Komachi</p>
      </Link>
    </div>
  );
}
