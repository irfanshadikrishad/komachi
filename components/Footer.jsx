"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import styles from "@/styles/footer.module.css";
import { usePathname } from "next/navigation";
// Icons
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  const path = usePathname();

  return (
    <footer className={styles.footer_Main}>
      <section className={`container ${styles.footer_Wrapper}`}>
        <section className="footer-part-one">
          <section className={styles.list_wrapper}>
            <h1>A-Z List</h1>
            <p>Searching anime order by alphabet name A to Z</p>
          </section>
          <section className={styles.list_Links}>
            <Link href="/lists/?show=all">All</Link>
            <Link href="/lists/?show=0-9">0-9</Link>
            <Link href="/lists/?show=A">A</Link>
            <Link href="/lists/?show=B">B</Link>
            <Link href="/lists/?show=C">C</Link>
            <Link href="/lists/?show=D">D</Link>
            <Link href="/lists/?show=E">E</Link>
            <Link href="/lists/?show=F">F</Link>
            <Link href="/lists/?show=G">G</Link>
            <Link href="/lists/?show=H">H</Link>
            <Link href="/lists/?show=I">I</Link>
            <Link href="/lists/?show=J">J</Link>
            <Link href="/lists/?show=K">K</Link>
            <Link href="/lists/?show=L">L</Link>
            <Link href="/lists/?show=M">M</Link>
            <Link href="/lists/?show=N">N</Link>
            <Link href="/lists/?show=O">O</Link>
            <Link href="/lists/?show=P">P</Link>
            <Link href="/lists/?show=Q">Q</Link>
            <Link href="/lists/?show=R">R</Link>
            <Link href="/lists/?show=S">S</Link>
            <Link href="/lists/?show=T">T</Link>
            <Link href="/lists/?show=U">U</Link>
            <Link href="/lists/?show=V">V</Link>
            <Link href="/lists/?show=W">W</Link>
            <Link href="/lists/?show=X">X</Link>
            <Link href="/lists/?show=Y">Y</Link>
            <Link href="/lists/?show=Z">Z</Link>
          </section>
        </section>
        <section className={styles.footerPartTwo}>
          <div className={styles.flogo}>
            <Logo />
          </div>
          <div className={styles.moreLinks}>
            <Link href="">Help</Link>
            <Link href="">FAQ</Link>
            <Link href="">Contact</Link>
            <Link href="">Request</Link>
            <Link
              href="/stats"
              prefetch={true}
              className={`${path === "/stats" ? "primary" : ""}`}
            >
              Stats
            </Link>
          </div>
          <p className={styles.disclaimer}>
            This site does not store any files on its server. All contents are
            provided by non-affiliated third parties.
          </p>
        </section>
        <section className={styles.copyright}>
          <p>Copyright © Irfan Shadik Rishad • All Rights Reserved</p>
          <section className={styles.social_media}>
            <Link href="https://github.com/irfanshadikrishad" target="_blank">
              <FaGithub />
            </Link>
            <Link href="https://youtube.com/@irfanshadikrishad" target="_blank">
              <FaYoutube />
            </Link>
          </section>
        </section>
      </section>
    </footer>
  );
}
