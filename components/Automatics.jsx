"use client"
import { useAutomatics } from "@/lib/zustand/automatics"
import styles from "@/styles/player.module.css"

export default function Automatics() {
  const {
    autoplay,
    autonext,
    autoskip,
    setAutoPlay,
    setAutoSkip,
    setAutoNext,
  } = useAutomatics()

  return (
    <section className={styles.ctrls}>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="play"
          checked={autoplay}
          onChange={(e) => {
            setAutoPlay(e.target.checked)
          }}
        />
        <p style={{ color: autoplay ? "var(--primary)" : "" }}>Auto Play</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="skip"
          checked={autoskip}
          onChange={(e) => {
            setAutoSkip(e.target.checked)
          }}
        />
        <p style={{ color: autoskip ? "var(--primary)" : "" }}>Auto Skip</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="next"
          checked={autonext}
          onChange={(e) => {
            setAutoNext(e.target.checked)
          }}
        />
        <p style={{ color: autonext ? "var(--primary)" : "" }}>Auto Next</p>
        <span className={styles.checkmark}></span>
      </label>
    </section>
  )
}
