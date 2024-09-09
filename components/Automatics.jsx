import styles from "@/styles/player.module.css";

export default function Automatics() {
  return (
    <section className={styles.ctrls}>
      <label className={styles.ctrl}>
        <input type="checkbox" name="play" />
        <p>Auto Play</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input type="checkbox" />
        <p>Auto Skip</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input type="checkbox" name="next" />
        <p>Auto Next</p>
        <span className={styles.checkmark}></span>
      </label>
    </section>
  );
}
