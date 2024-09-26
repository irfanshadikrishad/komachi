"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import styles from "@/styles/latest.module.css";
import cardio from "@/styles/cardio.module.css";
// Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getTitle } from "@/utils/helpers";
// Icons
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

export default function Latest() {
  const [all, setAll] = useState([]);
  const [japan, setJapan] = useState([]);
  const [china, setChina] = useState([]);
  const [korea, setKorea] = useState([]);
  const [render, setRender] = useState([]);
  const [currentlyActive, setCurrentlyActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(27);

  useEffect(() => {
    const activeTab = localStorage.getItem("latest") || "All";
    setCurrentlyActive(activeTab);
  }, []);

  const getLatest = async (page, perPage) => {
    if (page > 0 && perPage > 0) {
      setRender([]);
      const request = await fetch(`/api/recent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, perPage }),
        cache: "force-cache",
        next: { revalidate: 120 },
      });
      const {
        all,
        japan,
        china,
        korea,
        p = page,
        pp = perPage,
      } = await request.json();

      if (request.status === 200) {
        setAll(all);
        setJapan(japan);
        setChina(china);
        setKorea(korea);
        setCurrentPage(p);
        setCurrentPerPage(pp);

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
    }
  };

  useEffect(() => {
    getLatest(1, 27);
  }, []);

  return (
    <section className={`container`}>
      <section className={styles.latest_Main}>
        <section className={styles.latest_updates}>
          <div className={styles.header}>
            <p className={styles.partitionTitleII}>Latest updates</p>
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
              <button
                className={`${currentPage > 1 ? "primary" : ""}`}
                onClick={() => {
                  getLatest(Number(currentPage) - 1, 27);
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                className={`${currentPage >= 1 ? "primary" : ""}`}
                onClick={() => {
                  getLatest(Number(currentPage) + 1, 27);
                }}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          <div className={cardio.cardsContainer}>
            {render.length > 0
              ? render.map(
                  (
                    {
                      anilistId,
                      poster,
                      title,
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
                        title={getTitle(title)}
                        subCount={sub_episodes.length}
                        dubCount={dub_episodes.length}
                        totalCount={totalEpisodes}
                        isAdult={isAdult}
                        lastEpisode={
                          sub_episodes.length > 0
                            ? sub_episodes[sub_episodes.length - 1].number
                            : dub_episodes[dub_episodes.length - 1].number
                        }
                      />
                    );
                  }
                )
              : Array.from({ length: 27 }).map((_, index) => {
                  return (
                    <Skeleton
                      key={index}
                      height={273}
                      baseColor="var(--secondary)"
                      highlightColor="var(--background)"
                    />
                  );
                })}
          </div>
        </section>
      </section>
    </section>
  );
}
