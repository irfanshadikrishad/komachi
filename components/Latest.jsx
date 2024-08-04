"use client";
import { useEffect, useState } from "react";
import LatestCard from "@/components/LatestCard.jsx";
import Loader from "@/components/Loader.jsx";
import styles from "@/styles/latest.module.css";
import Ranking from "@/components/Ranking.jsx";

export default function Latest() {
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);

  const getPopular = async () => {
    try {
      const request = await fetch(`/api/popular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 10 }),
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

  const getTrending = async () => {
    try {
      const request = await fetch(`/api/trending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 10 }),
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

  const getLatest = async () => {
    const request = await fetch(`/api/recent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1 }),
    });
    const response = await request.json();

    if (request.status === 200) {
      setLatest(response);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getLatest();
    getPopular();
    getTrending();
  }, []);
  return (
    <section className={`container`}>
      <section className={styles.latest_Main}>
        <section className={styles.latest_updates}>
          {latest && (
            <div className="latest_Header">
              <p className="partitionTitleII">Latest updates</p>
            </div>
          )}
          <div className="latestContainer">
            {latest.length > 0 ? (
              latest.map(
                (
                  {
                    anilistId,
                    poster,
                    title,
                    sub_episodes,
                    dub_episodes,
                    isAdult,
                  },
                  index
                ) => {
                  return (
                    <LatestCard
                      key={index}
                      id={anilistId}
                      image={poster}
                      title={title.english ? title.english : title.romaji}
                      currentEpisode={
                        sub_episodes.length
                          ? sub_episodes.length
                          : dub_episodes.length
                      }
                      isAdult={isAdult}
                    />
                  );
                }
              )
            ) : (
              <Loader />
            )}
          </div>
        </section>
        {popular.length > 0 && (
          <Ranking popular={popular} trending={trending} />
        )}
      </section>
    </section>
  );
}
