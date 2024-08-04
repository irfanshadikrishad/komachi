"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader.jsx";
import styles from "@/styles/stats.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StatsTypes {
  total_animes: string;
  total_ongoing: string;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsTypes>({
    total_animes: "0",
    total_ongoing: "0",
  });
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const request = await fetch(`/api/stats`, {
        method: "GET",
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
    <>
      <Navbar />
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
            <div
              className={styles.stats_Card}
              style={{ backgroundImage: "url(fern.png)" }}
            >
              <p>Total Ongoing</p>
              <h1>{stats?.total_ongoing}</h1>
            </div>
          </section>
        )}
      </section>
      <Footer />
    </>
  );
}
