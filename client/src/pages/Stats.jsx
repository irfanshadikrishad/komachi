import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";
import Loader from "../components/Loader.jsx";
import styles from "../styles/stats.module.css";

export default function Stats() {
  const { SERVER } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/stats`, {
        method: "GET",
        "Content-Type": "application/json",
      });
      const response = await request.json();

      if (request.status === 200) {
        setStats(response);
        setLoading(false);
      } else {
        console.log(response);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);
  return (
    <section className="container">
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.stats_Cards}>
          <div
            className={styles.stats_Card}
            style={{ backgroundImage: "url(kanna.png)" }}
          >
            <p>Total Animes</p>
            <h1>{stats?.total_animes}</h1>
          </div>
        </section>
      )}
    </section>
  );
}
