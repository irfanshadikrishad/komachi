"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/search.module.css";
import cardio from "@/styles/cardio.module.css";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getTitle } from "@/utils/helpers";

export default function Trending() {
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    try {
      const request = await fetch(`/api/trending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 60 }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setTrending(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);
  return (
    <>
      <Navbar />
      <section className="container">
        <section className={styles.billboard_Wrapper}>
          <section className={styles.billboard_Main}>
            <div className={styles.billboard_HeaderMain}>
              <p className={styles.billboard_Header}>Trending</p>
            </div>
            <section className={cardio.cardsContainer}>
              {trending.map(
                ({
                  isAdult,
                  anilistId,
                  poster,
                  sub_episodes = [],
                  dub_episodes = [],
                  totalEpisodes,
                  title = { english: "", romaji: "" },
                }) => {
                  return (
                    <Card
                      key={anilistId}
                      id={anilistId}
                      image={poster}
                      subCount={sub_episodes.length}
                      dubCount={dub_episodes.length}
                      totalCount={totalEpisodes}
                      title={getTitle(title)}
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
