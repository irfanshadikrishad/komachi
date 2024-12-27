"use client"
import Logo from "@/components/Logo"
import styles from "@/styles/footer.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
// Icons
import { FaGithub, FaYoutube } from "react-icons/fa"
import { IoGlobeSharp } from "react-icons/io5"

export default function Footer() {
  const path = usePathname()

  return (
    <footer className={styles.footer_Main}>
      <section className={`container ${styles.footer_Wrapper}`}>
        <section className="footer-part-one">
          <section className={styles.list_wrapper}>
            <h1>A-Z List</h1>
            <p>Searching anime order by alphabet name A to Z</p>
          </section>
          <section className={styles.list_Links}>
            <Link prefetch={true} href="/lists/?show=all">
              All
            </Link>
            <Link prefetch={true} href="/lists/?show=0-9">
              0-9
            </Link>
            <Link prefetch={true} href="/lists/?show=other">
              #
            </Link>
            <Link prefetch={true} href="/lists/?show=A">
              A
            </Link>
            <Link prefetch={true} href="/lists/?show=B">
              B
            </Link>
            <Link prefetch={true} href="/lists/?show=C">
              C
            </Link>
            <Link prefetch={true} href="/lists/?show=D">
              D
            </Link>
            <Link prefetch={true} href="/lists/?show=E">
              E
            </Link>
            <Link prefetch={true} href="/lists/?show=F">
              F
            </Link>
            <Link prefetch={true} href="/lists/?show=G">
              G
            </Link>
            <Link prefetch={true} href="/lists/?show=H">
              H
            </Link>
            <Link prefetch={true} href="/lists/?show=I">
              I
            </Link>
            <Link prefetch={true} href="/lists/?show=J">
              J
            </Link>
            <Link prefetch={true} href="/lists/?show=K">
              K
            </Link>
            <Link prefetch={true} href="/lists/?show=L">
              L
            </Link>
            <Link prefetch={true} href="/lists/?show=M">
              M
            </Link>
            <Link prefetch={true} href="/lists/?show=N">
              N
            </Link>
            <Link prefetch={true} href="/lists/?show=O">
              O
            </Link>
            <Link prefetch={true} href="/lists/?show=P">
              P
            </Link>
            <Link prefetch={true} href="/lists/?show=Q">
              Q
            </Link>
            <Link prefetch={true} href="/lists/?show=R">
              R
            </Link>
            <Link prefetch={true} href="/lists/?show=S">
              S
            </Link>
            <Link prefetch={true} href="/lists/?show=T">
              T
            </Link>
            <Link prefetch={true} href="/lists/?show=U">
              U
            </Link>
            <Link prefetch={true} href="/lists/?show=V">
              V
            </Link>
            <Link prefetch={true} href="/lists/?show=W">
              W
            </Link>
            <Link prefetch={true} href="/lists/?show=X">
              X
            </Link>
            <Link prefetch={true} href="/lists/?show=Y">
              Y
            </Link>
            <Link prefetch={true} href="/lists/?show=Z">
              Z
            </Link>
          </section>
        </section>
        <section className={styles.footerPartTwo}>
          <div className={styles.flogo}>
            <Logo />
          </div>
          <div className={styles.moreLinks}>
            <Link href="">FAQ</Link>
            <Link href="">Contact</Link>
            <Link href="">Request</Link>
            <Link
              href="/stats"
              prefetch={true}
              className={`${path === "/stats" ? "primary" : ""}`}>
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
            <Link href="https://irfanshadikrishad.github.io" target="_blank">
              <IoGlobeSharp />
            </Link>
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
  )
}
