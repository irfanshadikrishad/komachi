import styles from "../styles/footer.module.css";
// ICONS
import { FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

export default function FooterFollow() {
  return (
    <section>
      <p style={{ color: "var(--primary)" }}>Follow</p>
      <div className={styles.follow}>
        <a target="_blank" href="https://github.com/irfanshadikrishad">
          <FaGithub />
        </a>
        <a target="_blank" href="https://youtube.com/@irfanshadikrishad">
          <FaYoutube />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/irfanshadikrishad">
          <FaLinkedin />
        </a>
      </div>
    </section>
  );
}
