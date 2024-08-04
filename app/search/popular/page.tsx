"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/search.module.css";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  const getPopular = async () => {
    try {
      const request = await fetch(`/api/popular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 60 }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setPopular(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);
  return (
    <>
      <Navbar />
      <section className="container">
        <section className={styles.billboard_Wrapper}>
          <section className={styles.billboard_Main}>
            <div className={styles.billboard_HeaderMain}>
              <p className={styles.billboard_Header}>popular</p>
            </div>
            <section className={styles.billboard}>
              {popular.map(
                ({ isAdult, anilistId, poster, totalEpisodes, title }) => {
                  return (
                    <Card
                      key={anilistId}
                      id={anilistId}
                      image={poster}
                      totalEpisodes={totalEpisodes}
                      title={title}
                      isAdult={isAdult}
                    />
                  );
                }
              )}
            </section>
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
}
