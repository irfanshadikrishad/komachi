import { stringToBoolean } from "@/utils/info_modifier";
import styles from "@/styles/player.module.css";

export default function Automatics() {
  // const handleCheckbox = (e) => {
  //   const { name, checked } = e.target;
  //   setAutomatics((prevAuto) => ({
  //     ...prevAuto,
  //     [name]: checked,
  //   }));
  //   localStorage.setItem(String(name), checked);
  // };

  return (
    <section className={styles.ctrls}>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="play"
          // checked={stringToBoolean(automatics.play)}
          // onChange={handleCheckbox}
        />
        <p>Auto Play</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          // name="skip"
          // checked={stringToBoolean(automatics.skip)}
          // onChange={handleCheckbox}
        />
        <p>Auto Skip</p>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.ctrl}>
        <input
          type="checkbox"
          name="next"
          // checked={stringToBoolean(automatics.next)}
          // onChange={handleCheckbox}
        />
        <p>Auto Next</p>
        <span className={styles.checkmark}></span>
      </label>
    </section>
  );
}
