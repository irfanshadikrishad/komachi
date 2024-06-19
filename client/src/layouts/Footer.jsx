import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "../styles/footer.module.css";
import FooterFollow from "../components/FooterFollow";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const { SERVER } = useAuth();

  const getRandom = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/random`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await request.json();

      if (request.status === 200) {
        navigate(`/streaming/${String(response.id)}`);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            <span className={styles.link_wrapper}>
              <Link to="/">Home</Link>
            </span>
            <span className={styles.link_wrapper}>
              <Link onClick={getRandom}>Random</Link>
            </span>
            <span className={styles.link_wrapper}>
              <Link to="/search/trending">Trending</Link>
            </span>
            <span className={styles.link_wrapper}>
              <Link to="/search/popular">Popular</Link>
            </span>
          </div>
          <FooterFollow />
        </div>
      </section>
    </section>
  );
}
