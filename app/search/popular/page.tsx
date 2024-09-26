"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/search.module.css";
import cardio from "@/styles/cardio.module.css";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getTitle } from "@/utils/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(60);

  const getTrending = async (page?: number, perPage?: number) => {
    try {
      const request = await fetch(`/api/popular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: page ? page : 1,
          perPage: perPage ? perPage : 60,
        }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setTrending(response.results);
        setCurrentPage(response.currentPage);
        setTotalCount(response.totalCount);
        setTotalPages(response.totalPages);
        setPerPage(response.perPage);
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
              <p className={styles.billboard_Header}>Popular</p>
              <div className={styles.pageBtns}>
                <button
                  className={`${currentPage > 1 ? "primary" : ""}`}
                  onClick={() => {
                    if (Number(currentPage) > 1) {
                      getTrending(Number(currentPage) - 1);
                    }
                  }}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className={`${currentPage <= totalPages ? "primary" : ""}`}
                  onClick={() => {
                    if (Number(currentPage) < totalPages) {
                      getTrending(Number(currentPage) + 1);
                    }
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
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
