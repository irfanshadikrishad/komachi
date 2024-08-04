"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/search.module.css";
// ICONS
import { RiSearchLine } from "react-icons/ri";
// Components
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Search() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get("query") ? searchParams.get("query") : null
  );
  const [searched, setSearched] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  const getSearched = async () => {
    if (query) {
      const request = await fetch(`/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
        }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setSearched(response);
      } else {
        console.log(response);
      }
    }
  };

  const getTrending = async () => {
    try {
      const request = await fetch(`/api/trending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 7 }),
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

  const getPopular = async () => {
    try {
      const request = await fetch(`/api/popular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 7 }),
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
    getTrending();
    getPopular();
  }, []); // need to fetch only once

  useEffect(() => {
    getSearched();
  }, [query]);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <section className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={styles.filter}
          >
            <section>
              <p className={styles.selector_Title}>Search</p>
              <div className={styles.searchFieldContainer}>
                <RiSearchLine />
                <input
                  value={query ? query : ""}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  type="text"
                  className={styles.searchField}
                />
              </div>
            </section>
          </form>

          {searched.length > 0 ? (
            <section className={styles.billboard_Wrapper}>
              <section className={styles.billboard_Main}>
                <div className={styles.billboard_HeaderMain}>
                  <p className={styles.billboard_Header}>
                    {query !== null && `Search result for '${query}'`}
                  </p>
                </div>
                <section className={styles.billboard}>
                  {searched.map(
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
          ) : (
            <section className={styles.billboard_Wrapper}>
              <section className={styles.billboard_Main}>
                <div className={styles.billboard_HeaderMain}>
                  <p className={styles.billboard_Header}>Trending</p>
                  <Link href={`/search/trending`}>view all</Link>
                </div>
                <section className={styles.billboard}>
                  {trending.map(
                    ({ anilistId, poster, totalEpisodes, title, isAdult }) => {
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
              <section className={styles.billboard_Main}>
                <div className={styles.billboard_HeaderMain}>
                  <p className={styles.billboard_Header}>Popular</p>
                  <Link href={`/search/popular`}>view all</Link>
                </div>
                <section className={styles.billboard}>
                  {popular.map(
                    ({ anilistId, poster, totalEpisodes, title, isAdult }) => {
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
          )}
        </section>
        <Footer />
      </Suspense>
    </>
  );
}
