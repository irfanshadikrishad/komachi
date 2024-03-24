import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/fpl.module.css";

export default function FullPageLoader() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return createPortal(
    <section className={styles.fullPageLoader}>
      <section className={styles.fullPageLoader_container}>
        <img src="/loader.gif" alt="gif" width="50px" height="auto" />
        <p>Wait a moment. Time elapsed {seconds} sec.</p>
      </section>
    </section>,
    document.getElementById("loader")
  );
}
