"use client";
import Logo from "@/components/Logo";
import styles from "@/styles/footer.module.css";
import Link from "next/link";
// Icons
import { FaYoutube, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className="container">
        <div className={styles.part1}>
          <Logo />
          <p>{`© Irfan Shadik Rishad • 2024 - ${new Date().getFullYear()}`}</p>
          <div className={styles.footer_links}>
            <Link target="_blank" href="https://github.com/irfanshadikrishad">
              <FaGithub />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/@irfanshadikrishad"
            >
              <RiInstagramFill />
            </Link>
            <Link
              target="_blank"
              href="https://www.youtube.com/@irfanshadikrishad"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
