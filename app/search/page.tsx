"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/search.module.css";
// ICONS
import { RiSearchLine } from "react-icons/ri";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";
import { HiFilter } from "react-icons/hi";
// Components
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Search() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get("query") ? searchParams.get("query") : null
  );
  const [searched, setSearched] = useState<any[]>([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  // Open/Close Management
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const [isFormatOpen, setIsFormatOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  // Value Management
  const [genre, setGenre] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);
  const [season, setSeason] = useState<string[]>([]);
  const [format, setFormat] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);

  const getSearched = async () => {
    const request = await fetch(`/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        genre,
        year,
        season,
        format,
        status,
        origin: country,
        perPage: 60,
      }),
    });
    const response = await request.json();

    if (request.status === 200) {
      setSearched(response);
    } else {
      setSearched([]);
      console.log(response);
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

  const insertValuesIntoState = (value: string, setValue: any) => {
    setValue((prevValue: string[]) => {
      if (prevValue.includes(value)) {
        return prevValue.filter((item) => item !== value);
      } else {
        return [...prevValue, value];
      }
    });
  };

  useEffect(() => {
    getTrending();
    getPopular();
  }, []);

  useEffect(() => {
    if (searchParams.get("query")) {
      getSearched();
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={styles.filter}
        >
          <section className={styles.filter_indi}>
            <div className={styles.searchFieldContainer}>
              <RiSearchLine />
              <input
                value={query ? query : ""}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search..."
                className={styles.searchField}
              />
            </div>
          </section>
          {/* Genre */}
          <section className={styles.filter_indi}>
            <button
              className={styles.filter_btn}
              onClick={() => {
                setIsGenreOpen(!isGenreOpen);
                setIsYearOpen(false);
                setIsSeasonOpen(false);
                setIsFormatOpen(false);
                setIsCountryOpen(false);
                setIsStatusOpen(false);
              }}
            >
              <p className={`one_line ${styles.values}`}>
                {genre.length > 0 ? genre.join(", ") : "Genres"}
              </p>
              <IoChevronDownOutline />
            </button>
            {isGenreOpen && (
              <div className={styles.filter_options}>
                <button
                  onClick={() => {
                    insertValuesIntoState("Action", setGenre);
                  }}
                >
                  <p>Action</p>
                  {genre.includes("Action") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Adventure", setGenre);
                  }}
                >
                  <p>Adventure</p>
                  {genre.includes("Adventure") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Comedy", setGenre);
                  }}
                >
                  <p>Comedy</p>
                  {genre.includes("Comedy") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Horror", setGenre);
                  }}
                >
                  <p>Horror</p>
                  {genre.includes("Horror") && <PiCheckCircleFill />}
                </button>
              </div>
            )}
          </section>
          {/* Year */}
          <section className={styles.filter_indi}>
            <button
              className={styles.filter_btn}
              onClick={() => {
                setIsYearOpen(!isYearOpen);
                setIsGenreOpen(false);
                setIsSeasonOpen(false);
                setIsFormatOpen(false);
                setIsCountryOpen(false);
                setIsStatusOpen(false);
              }}
            >
              <p className={`one_line ${styles.values}`}>
                {year.length > 0 ? year.join(", ") : "Year"}
              </p>
              <IoChevronDownOutline />
            </button>
            {isYearOpen && (
              <div className={styles.filter_options}>
                <button
                  onClick={() => {
                    insertValuesIntoState("2024", setYear);
                  }}
                >
                  <p>2024</p>
                  {year.includes("2024") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("2023", setYear);
                  }}
                >
                  <p>2023</p>
                  {year.includes("2023") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("2022", setYear);
                  }}
                >
                  <p>2022</p>
                  {year.includes("2022") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("2021", setYear);
                  }}
                >
                  <p>2021</p>
                  {year.includes("2021") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("2020", setYear);
                  }}
                >
                  <p>2020</p>
                  {year.includes("2020") && <PiCheckCircleFill />}
                </button>
              </div>
            )}
          </section>
          {/* Season */}
          <section className={styles.filter_indi}>
            <button
              className={styles.filter_btn}
              onClick={() => {
                setIsSeasonOpen(!isSeasonOpen);
                setIsGenreOpen(false);
                setIsYearOpen(false);
                setIsFormatOpen(false);
                setIsCountryOpen(false);
                setIsStatusOpen(false);
              }}
            >
              <p className={`one_line ${styles.values}`}>
                {season.length > 0 ? season.join(", ") : "Season"}
              </p>
              <IoChevronDownOutline />
            </button>
            {isSeasonOpen && (
              <div className={styles.filter_options}>
                <button
                  onClick={() => {
                    insertValuesIntoState("Summer", setSeason);
                  }}
                >
                  <p>Summer</p>
                  {season.includes("Summer") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Winter", setSeason);
                  }}
                >
                  <p>Winter</p>
                  {season.includes("Winter") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Fall", setSeason);
                  }}
                >
                  <p>Fall</p>
                  {season.includes("Fall") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Spring", setSeason);
                  }}
                >
                  <p>Spring</p>
                  {season.includes("Spring") && <PiCheckCircleFill />}
                </button>
              </div>
            )}
          </section>
          {/* Format */}
          <section className={styles.filter_indi}>
            <button
              className={styles.filter_btn}
              onClick={() => {
                setIsFormatOpen(!isFormatOpen);
                setIsGenreOpen(false);
                setIsYearOpen(false);
                setIsSeasonOpen(false);
                setIsCountryOpen(false);
                setIsStatusOpen(false);
              }}
            >
              <p className={`one_line ${styles.values}`}>
                {format.length > 0 ? format.join(", ") : "Format"}
              </p>
              <IoChevronDownOutline />
            </button>
            {isFormatOpen && (
              <div className={styles.filter_options}>
                <button
                  onClick={() => {
                    insertValuesIntoState("TV", setFormat);
                  }}
                >
                  <p>TV</p>
                  {format.includes("TV") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("TV_SHORT", setFormat);
                  }}
                >
                  <p>TV Short</p>
                  {format.includes("TV_SHORT") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("MOVIE", setFormat);
                  }}
                >
                  <p>Movie</p>
                  {format.includes("MOVIE") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("OVA", setFormat);
                  }}
                >
                  <p>OVA</p>
                  {format.includes("OVA") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("ONA", setFormat);
                  }}
                >
                  <p>ONA</p>
                  {format.includes("ONA") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("MUSIC", setFormat);
                  }}
                >
                  <p>Music</p>
                  {format.includes("MUSIC") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("SPECIAL", setFormat);
                  }}
                >
                  <p>Special</p>
                  {format.includes("SPECIAL") && <PiCheckCircleFill />}
                </button>
              </div>
            )}
          </section>
          {/* Status */}
          <section className={styles.filter_indi}>
            <button
              className={styles.filter_btn}
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsGenreOpen(false);
                setIsYearOpen(false);
                setIsSeasonOpen(false);
                setIsFormatOpen(false);
                setIsCountryOpen(false);
              }}
            >
              <p className={`one_line ${styles.values}`}>
                {status.length > 0 ? status.join(", ") : "Status"}
              </p>
              <IoChevronDownOutline />
            </button>
            {isStatusOpen && (
              <div className={styles.filter_options}>
                <button
                  onClick={() => {
                    insertValuesIntoState("Ongoing", setStatus);
                  }}
                >
                  <p>Ongoing</p>
                  {status.includes("Ongoing") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Finished", setStatus);
                  }}
                >
                  <p>Finished</p>
                  {status.includes("Finished") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("Cancelled", setStatus);
                  }}
                >
                  <p>Cancelled</p>
                  {status.includes("Cancelled") && <PiCheckCircleFill />}
                </button>
              </div>
            )}
          </section>
          {/* Country */}
          <section className={styles.filter_indi}>
            <button
              className={styles.filter_btn}
              onClick={() => {
                setIsCountryOpen(!isCountryOpen);
                setIsGenreOpen(false);
                setIsYearOpen(false);
                setIsSeasonOpen(false);
                setIsFormatOpen(false);
                setIsStatusOpen(false);
              }}
            >
              <p className={`one_line ${styles.values}`}>
                {country.length > 0 ? country.join(", ") : "Country"}
              </p>
              <IoChevronDownOutline />
            </button>
            {isCountryOpen && (
              <div className={styles.filter_options}>
                <button
                  onClick={() => {
                    insertValuesIntoState("JP", setCountry);
                  }}
                >
                  <p>Japan</p>
                  {country.includes("JP") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("CN", setCountry);
                  }}
                >
                  <p>China</p>
                  {country.includes("CN") && <PiCheckCircleFill />}
                </button>
                <button
                  onClick={() => {
                    insertValuesIntoState("KR", setCountry);
                  }}
                >
                  <p>Korea</p>
                  {country.includes("KR") && <PiCheckCircleFill />}
                </button>
              </div>
            )}
          </section>
          {/* Filter */}
          <button
            className={styles.submit_btn}
            onClick={() => {
              getSearched();
            }}
          >
            <HiFilter />
            Filter
          </button>
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
                  ({
                    isAdult,
                    anilistId,
                    poster,
                    sub_episodes,
                    dub_episodes,
                    totalEpisodes,
                    title = { english: "", romaji: "" },
                  }) => (
                    <Card
                      key={anilistId}
                      id={anilistId}
                      image={poster}
                      subCount={sub_episodes.length}
                      dubCount={dub_episodes.length}
                      totalCount={totalEpisodes}
                      title={title.english ? title.english : title.romaji}
                      isAdult={isAdult}
                    />
                  )
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
                  ({
                    anilistId,
                    poster,
                    sub_episodes = [],
                    dub_episodes = [],
                    totalEpisodes,
                    title = { english: "", romaji: "" },
                    isAdult,
                  }) => (
                    <Card
                      key={anilistId}
                      id={anilistId}
                      image={poster}
                      subCount={sub_episodes.length}
                      dubCount={dub_episodes.length}
                      totalCount={totalEpisodes}
                      title={title.english ? title.english : title.romaji}
                      isAdult={isAdult}
                    />
                  )
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
                  ({
                    anilistId,
                    poster,
                    sub_episodes = [],
                    dub_episodes = [],
                    totalEpisodes,
                    title = { english: "", romaji: "" },
                    isAdult,
                  }) => (
                    <Card
                      key={anilistId}
                      id={anilistId}
                      image={poster}
                      subCount={sub_episodes.length}
                      dubCount={dub_episodes.length}
                      totalCount={totalEpisodes}
                      title={title.english ? title.english : title.romaji}
                      isAdult={isAdult}
                    />
                  )
                )}
              </section>
            </section>
          </section>
        )}
      </section>
      <Footer />
    </>
  );
}
