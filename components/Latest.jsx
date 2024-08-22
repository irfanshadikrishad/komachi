"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Loader from "@/components/Loader.jsx";
import styles from "@/styles/latest.module.css";
import Ranking from "@/components/Ranking.jsx";

export default function Latest() {
  const [all, setAll] = useState([]);
  const [japan, setJapan] = useState([]);
  const [china, setChina] = useState([]);
  const [korea, setKorea] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [render, setRender] = useState([]);
  const [currentlyActive, setCurrentlyActive] = useState("All");

  useEffect(() => {
    const activeTab = localStorage.getItem("latest") || "All";
    setCurrentlyActive(activeTab);
  }, []);

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
    const { all, japan, china, korea } = await request.json();

    if (request.status === 200) {
      setAll(all);
      setJapan(japan);
      setChina(china);
      setKorea(korea);
      setLoaded(true);

      const activeTab = localStorage.getItem("latest");
      if (activeTab) {
        if (activeTab === "JP") {
          setRender(japan);
        } else if (activeTab === "CN") {
          setRender(china);
        } else if (activeTab === "KR") {
          setRender(korea);
        } else {
          setRender(all);
        }
      } else {
        setRender(all);
      }
    } else {
      console.log(`fetch error on latest api.`);
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
          {loaded && (
            <div className="latest_Header">
              <p className="partitionTitleII">Latest updates</p>
              <div className={styles.switch}>
                <button
                  onClick={() => {
                    setRender(all);
                    setCurrentlyActive("All");
                    localStorage.setItem("latest", "All");
                  }}
                  style={{
                    color: currentlyActive === "All" ? "var(--primary)" : "",
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setRender(japan);
                    setCurrentlyActive("JP");
                    localStorage.setItem("latest", "JP");
                  }}
                  style={{
                    color: currentlyActive === "JP" ? "var(--primary)" : "",
                  }}
                >
                  JP
                </button>
                <button
                  onClick={() => {
                    setRender(china);
                    setCurrentlyActive("CN");
                    localStorage.setItem("latest", "CN");
                  }}
                  style={{
                    color: currentlyActive === "CN" ? "var(--primary)" : "",
                  }}
                >
                  CH
                </button>
                <button
                  onClick={() => {
                    setRender(korea);
                    setCurrentlyActive("KR");
                    localStorage.setItem("latest", "KR");
                  }}
                  style={{
                    color: currentlyActive === "KR" ? "var(--primary)" : "",
                  }}
                >
                  KR
                </button>
              </div>
            </div>
          )}
          <div className="latestContainer">
            {render.length > 0 ? (
              render.map(
                (
                  {
                    anilistId,
                    poster,
                    title = { english: "", romaji: "" },
                    sub_episodes = [],
                    dub_episodes = [],
                    totalEpisodes,
                    isAdult,
                  },
                  index
                ) => {
                  return (
                    <Card
                      key={index}
                      id={anilistId}
                      image={poster}
                      title={title.english ? title.english : title.romaji}
                      subCount={sub_episodes.length}
                      dubCount={dub_episodes.length}
                      totalCount={totalEpisodes}
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
