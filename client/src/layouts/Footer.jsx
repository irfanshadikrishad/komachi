import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "../styles/footer.module.css";
import FooterFollow from "../components/FooterFollow";

export default function Footer() {
  return (
    <section className={styles.footer_main}>
      <section className={`container ${styles.footer}`}>
        <div>
          <Logo />
          <p>
            Disclaimer: This site does not store any files on its server. All
            contents are provided by non-affiliated third parties.
          </p>
          <p className={styles.copyright}>
            © Irfan Shadik Rishad, 2024 - {new Date().getFullYear()}
          </p>
        </div>
        <div className={styles.part_two}>
          <p style={{ color: "var(--primary)" }}>Navigations</p>
          <div className={styles.footer_links}>
            <Link to="/">Home</Link>
          </div>
          <FooterFollow />
        </div>
      </section>
    </section>
  );
}
