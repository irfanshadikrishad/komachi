"use client";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import styles from "@/styles/footer.module.css";
import FooterFollow from "@/components/FooterFollow";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();

  const getRandom = async () => {
    try {
      const request = await fetch(`/api/random`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await request.json();

      if (request.status === 200) {
        router.push(`/watch/${String(response[0].anilistId)}`);
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
              <Link href="/">Home</Link>
            </span>
            <span className={styles.link_wrapper}>
              <a onClick={getRandom}>Random</a>
            </span>
            <span className={styles.link_wrapper}>
              <Link href="/search/trending">Trending</Link>
            </span>
            <span className={styles.link_wrapper}>
              <Link href="/search/popular">Popular</Link>
            </span>
            <span className={styles.link_wrapper}>
              <Link href="/stats">Stats</Link>
            </span>
          </div>
          <FooterFollow />
        </div>
      </section>
    </section>
  );
}
