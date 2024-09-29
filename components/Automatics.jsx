"use client";
import { useState } from "react";
import styles from "@/styles/player.module.css";

export default function Automatics() {
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoSkip, setAutoSkip] = useState(false);
  const [autoNext, setAutoNext] = useState(false);

  return (
    <section className={styles.ctrls}>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="play"
          onChange={(e) => {
            setAutoPlay(e.target.checked);
          }}
        />
        <p style={{ textDecoration: "line-through" }}>Auto Play</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="skip"
          onChange={(e) => {
            setAutoSkip(e.target.checked);
          }}
        />
        <p style={{ textDecoration: "line-through" }}>Auto Skip</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="next"
          onChange={(e) => {
            setAutoNext(e.target.checked);
          }}
        />
        <p style={{ textDecoration: "line-through" }}>Auto Next</p>
        <span className={styles.checkmark}></span>
      </label>
    </section>
  );
}
