import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { Helmet } from "react-helmet";
import styles from "../styles/search.module.css";
// ICONS
import { RiSearchLine } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { MdTune } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
// Components
import Card from "../components/Card.jsx";
import GenreButton from "../components/GenreButton.jsx";
import FormatButton from "../components/FormatButton.jsx";

export default function Search() {
  const { SERVER } = useAuth();
  const { search } = useLocation();
  const location = new URLSearchParams(search);
  const [query, setQuery] = useState(
    location.get("query") ? location.get("query") : undefined
  );
  const [searched, setSearched] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  // Advance Search Open/Close
  const [isFormatOpen, setIsFormatOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  // Advance Search States
  const [year, setYear] = useState(undefined);
  const [season, setSeason] = useState(undefined);
  const [format, setFormat] = useState([]);
  const [genres, setGenres] = useState([]);
  const [allYrs, setAllYrs] = useState([]);
  // References
  const formatRef = useRef(null);

  // for format ouside click
  const handleClickOutside = (event) => {
    const classMap = {
      format_btn: setIsFormatOpen,
      genre_btn: setIsGenresOpen,
      season_btn: setIsSeasonOpen,
      year_btn: setIsYearOpen,
    };

    Object.keys(classMap).forEach((key) => {
      if (event.target.className !== key) {
        classMap[key](false);
      }
    });
  };

  const getSearched = async (e) => {
    const request = await fetch(`${SERVER}/api/v1/anime/advance-search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        format:
          format.length > 0
            ? format
            : ["TV", "TV_SHORT", "SPECIAL", "MOVIE", "OVA", "ONA"],
        genres: genres.length > 0 ? genres : undefined,
        year: year ? year : undefined,
        season: season ? season : undefined,
      }),
    });
    const response = await request.json();
    // console.log(response);
    if (request.status === 200) {
      setSearched(response);
    } else {
      console.log(response);
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

  const allYears = () => {
    const current_Year = new Date().getFullYear();
    const yrs = [current_Year + 1, current_Year];
    for (let i = 1; i < 10; i++) {
      yrs.push(current_Year - i);
    }
    setAllYrs(yrs);
  };

  useEffect(() => {
    getTrending();
    getPopular();
    allYears();
    // Outside click handler
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // need to fetch only once

  useEffect(() => {
    getSearched();
  }, [query, format, genres, year, season]);
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
        <section className={styles.list_Wrapper}>
          <p className={styles.selector_Title}>Genres</p>
          <button
            className={styles.selector}
            onClick={() => {
              setIsGenresOpen(true);
            }}
          >
            <section ref={formatRef} className={styles.arrays}>
              {genres.length > 0 ? (
                genres.map((gnr, index) => {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation(); // this stops it from closing dropdown
                        //  delete format from list
                        setGenres(genres.filter((item) => item !== gnr));
                      }}
                      key={index}
                      className={styles.array}
                    >
                      <p>{gnr}</p>
                    </div>
                  );
                })
              ) : (
                <p>Any</p>
              )}
            </section>
            <IoChevronDown />
          </button>
          {isGenresOpen && (
            <section className={styles.genre_List}>
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Action"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Adventure"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Horror"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Cars"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Comedy"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Drama"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Fantasy"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Mecha"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Mystery"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Sci-Fi"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Psychological"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Romance"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Sports"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Supernatural"}
              />
              <GenreButton
                genres={genres}
                setGenres={setGenres}
                genre={"Thriller"}
              />
            </section>
          )}
        </section>
        <section className={styles.list_Wrapper}>
          <p className={styles.selector_Title}>Year</p>
          <button
            className={styles.selector}
            onClick={() => {
              setIsYearOpen(true);
            }}
          >
            <section ref={formatRef} className={styles.arrays}>
              {year !== undefined ? (
                <div
                  onClick={() => {
                    setYear(undefined);
                  }}
                  className={styles.array}
                >
                  <p>{year}</p>
                </div>
              ) : (
                <p>Any</p>
              )}
            </section>
            <IoChevronDown />
          </button>
          {isYearOpen && (
            <section className={styles.genre_List}>
              {allYrs &&
                allYrs.map((alyrs, i) => {
                  return (
                    <button
                      key={i}
                      className="year_btn"
                      onClick={() => {
                        setYear(alyrs);
                      }}
                    >
                      {alyrs}
                      {year === alyrs && <FaCheckCircle />}
                    </button>
                  );
                })}
            </section>
          )}
        </section>
        <section className={styles.list_Wrapper}>
          <p className={styles.selector_Title}>Season</p>
          <button
            className={styles.selector}
            onClick={() => {
              setIsSeasonOpen(true);
            }}
          >
            <section ref={formatRef} className={styles.arrays}>
              {season !== undefined ? (
                <div
                  onClick={() => {
                    setSeason(undefined);
                  }}
                  className={styles.array}
                >
                  <p>{season}</p>
                </div>
              ) : (
                <p>Any</p>
              )}
            </section>
            <IoChevronDown />
          </button>
          {isSeasonOpen && (
            <section className={styles.genre_List}>
              <button
                className="season_btn"
                onClick={() => {
                  setSeason("SPRING");
                }}
              >
                Spring
                {season === "SPRING" && <FaCheckCircle />}
              </button>
              <button
                className="season_btn"
                onClick={() => {
                  setSeason("SUMMER");
                }}
              >
                Summer
                {season === "SUMMER" && <FaCheckCircle />}
              </button>
              <button
                className="season_btn"
                onClick={() => {
                  setSeason("FALL");
                }}
              >
                Fall
                {season === "FALL" && <FaCheckCircle />}
              </button>
              <button
                className="season_btn"
                onClick={() => {
                  setSeason("WINTER");
                }}
              >
                Winter
                {season === "WINTER" && <FaCheckCircle />}
              </button>
            </section>
          )}
        </section>
        <section className={styles.list_Wrapper}>
          <p className={styles.selector_Title}>Format</p>
          <button
            className={styles.selector}
            onClick={() => {
              setIsFormatOpen(true);
            }}
          >
            <section ref={formatRef} className={styles.arrays}>
              {format.length > 0 ? (
                format.map((frmt, index) => {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation(); // this stops it from closing dropdown
                        //  delete format from list
                        setFormat(format.filter((item) => item !== frmt));
                      }}
                      key={index}
                      className={styles.array}
                    >
                      <p>{frmt}</p>
                    </div>
                  );
                })
              ) : (
                <p>Any</p>
              )}
            </section>
            <IoChevronDown />
          </button>
          {isFormatOpen && (
            <section className={styles.genre_List}>
              <FormatButton name={"TV"} format={format} setFormat={setFormat} />
              <FormatButton
                name={"TV_SHORT"}
                format={format}
                setFormat={setFormat}
              />
              <FormatButton
                name={"MOVIE"}
                format={format}
                setFormat={setFormat}
              />
              <FormatButton
                name={"SPECIAL"}
                format={format}
                setFormat={setFormat}
              />
              <FormatButton
                name={"OVA"}
                format={format}
                setFormat={setFormat}
              />
              <FormatButton
                name={"ONA"}
                format={format}
                setFormat={setFormat}
              />
            </section>
          )}
        </section>
        <section>
          <button className={styles.options} disabled>
            {<MdTune />}
          </button>
        </section>
      </form>

      {searched.length > 0 ? (
        <section className={styles.billboard_Wrapper}>
          <section className={styles.billboard_Main}>
            <div className={styles.billboard_HeaderMain}>
              <p className={styles.billboard_Header}>{`Search result for '${
                query !== undefined ? query : "(⊙x⊙;)"
              }'`}</p>
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
