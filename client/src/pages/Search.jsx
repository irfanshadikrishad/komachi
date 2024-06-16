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
import Card from "../components/Card.jsx";

export default function Search() {
  const { SERVER } = useAuth();
  const { search } = useLocation();
  const location = new URLSearchParams(search);
  const [query, setQuery] = useState(location.get("query"));
  const [searched, setSearched] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  const getSearched = async (e) => {
    // e.preventDefault();
    if (query) {
      const request = await fetch(`${SERVER}/api/v1/anime/advance-search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const response = await request.json();
      console.log(response);
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
      const request = await fetch(`${SERVER}/api/v1/anime/popular`, {
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
    getSearched();
    getTrending();
    getPopular();
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
      </form>

      {query ? (
        <section className={styles.billboard_Wrapper}>
          <section className={styles.billboard_Main}>
            <div className={styles.billboard_HeaderMain}>
              <p
                className={styles.billboard_Header}
              >{`Search result for ${query}`}</p>
            </div>
            <section className={styles.billboard}>
              {searched.map(({ id, image, totalEpisodes, title }) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    image={image}
                    totalEpisodes={totalEpisodes}
                    title={title}
                  />
                );
              })}
            </section>
          </section>
        </section>
      ) : (
        <section className={styles.billboard_Wrapper}>
          <section className={styles.billboard_Main}>
            <div className={styles.billboard_HeaderMain}>
              <p className={styles.billboard_Header}>Trending</p>
              <Link to={`/search/trending`}>view all</Link>
            </div>
            <section className={styles.billboard}>
              {trending.map(({ id, image, totalEpisodes, title }) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    image={image}
                    totalEpisodes={totalEpisodes}
                    title={title}
                  />
                );
              })}
            </section>
          </section>
          <section className={styles.billboard_Main}>
            <div className={styles.billboard_HeaderMain}>
              <p className={styles.billboard_Header}>Popular</p>
              <Link to={`/search/popular`}>view all</Link>
            </div>
            <section className={styles.billboard}>
              {popular.map(({ id, image, totalEpisodes, title }) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    image={image}
                    totalEpisodes={totalEpisodes}
                    title={title}
                  />
                );
              })}
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
