import { useEffect, useState } from "react";
import { useParams, NavLink, useLocation, Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader.jsx";
import styles from "../styles/search.module.css";
// ICONS
import { RiSearchLine } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { MdTune } from "react-icons/md";

export default function Search() {
  const { SERVER } = useAuth();
  const { search } = useLocation();
  const location = new URLSearchParams(search);
  const [query, setQuery] = useState(location.get("search"));
  const [searched, setSearched] = useState([]);
  const [trending, setTrending] = useState([]);

  const getSearched = async () => {
    if (query) {
      const request = await fetch(`${SERVER}/api/v1/anime/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery: query }),
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
      const request = await fetch(`${SERVER}/api/v1/anime/trending`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
    getSearched();
    getTrending();
  }, [query]);
  return (
    <section className="container">
      <Helmet>
        <title>{`Konami / search`}</title>
        <meta name="description" content="Konami - Search for anime" />
        <meta
          name="keywords"
          content="konami, search anime, watch anime online"
        />
      </Helmet>

      <section className={styles.filter}>
        <section>
          <p className={styles.selector_Title}>Search</p>
          <div className={styles.searchFieldContainer}>
            <RiSearchLine />
            <input type="text" className={styles.searchField} />
          </div>
        </section>
        <section>
          <p className={styles.selector_Title}>Genres</p>
          <button className={styles.selector}>
            <p>Any</p>
            <IoChevronDown />
          </button>
        </section>
        <section>
          <p className={styles.selector_Title}>Year</p>
          <button className={styles.selector}>
            <p>Any</p>
            <IoChevronDown />
          </button>
        </section>
        <section>
          <p className={styles.selector_Title}>Season</p>
          <button className={styles.selector}>
            <p>Any</p>
            <IoChevronDown />
          </button>
        </section>
        <section>
          <p className={styles.selector_Title}>Format</p>
          <button className={styles.selector}>
            <p>Any</p>
            <IoChevronDown />
          </button>
        </section>
        <section>
          <button className={styles.options}>{<MdTune />}</button>
        </section>
      </section>

      <section className={styles.billboard_Main}>
        <p className={styles.billboard_Header}>Trending</p>
        <section className={styles.billboard}>
          {trending.slice(0, 7).map((tren) => {
            return (
              <Link
                to={`/streaming/${tren.id}`}
                key={tren.id}
                className={styles.billboard_Individual}
              >
                <img
                  src={tren.image}
                  alt={tren.image}
                  className={styles.billboard_Poster}
                  draggable={false}
                />
                <p className={styles.billboard_Title}>
                  {tren.title.english ? tren.title.english : tren.title.romaji}
                </p>
              </Link>
            );
          })}
        </section>
      </section>
    </section>
  );
}
