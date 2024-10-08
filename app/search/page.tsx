"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// Components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Popular from "@/components/Popular";
import Trending from "@/components/Trending";
import SearchResults from "@/components/SearchResults";
import Country from "@/components/filter/Country";
import Filter from "@/components/filter/Filter";
import Status from "@/components/filter/Status";
import Format from "@/components/filter/Format";
import Season from "@/components/filter/Season";
import Year from "@/components/filter/Year";
import Genre from "@/components/filter/Genre";
import Input from "@/components/filter/Input";
// Styles
import styles from "@/styles/search.module.css";
import cardio from "@/styles/cardio.module.css";
// Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Search() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string | null>(searchParams.get("query"));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
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

  const getSearched = async (page?: number, perPage?: number) => {
    setIsLoading(true);
    setNotFound(false);
    setResults([]);
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
        page: page ? page : 1,
        perPage: perPage ? perPage : 60,
      }),
    });
    const response = await request.json();
    setIsLoading(false);

    if (request.status === 200) {
      setResults(response.results);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
    } else {
      setNotFound(true);
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
        setTrending(response.results);
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
        setPopular(response.results);
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
  }, [searchParams]);

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
          <Input query={query} setQuery={setQuery} getSearched={getSearched} />
          <Genre
            genre={genre}
            setGenre={setGenre}
            isGenreOpen={isGenreOpen}
            insertValuesIntoState={insertValuesIntoState}
            setIsGenreOpen={setIsGenreOpen}
            setIsYearOpen={setIsYearOpen}
            setIsSeasonOpen={setIsSeasonOpen}
            setIsFormatOpen={setIsFormatOpen}
            setIsCountryOpen={setIsCountryOpen}
            setIsStatusOpen={setIsStatusOpen}
          />
          <Year
            year={year}
            setYear={setYear}
            isYearOpen={isYearOpen}
            setIsYearOpen={setIsYearOpen}
            setIsGenreOpen={setIsGenreOpen}
            setIsSeasonOpen={setIsSeasonOpen}
            setIsFormatOpen={setIsFormatOpen}
            setIsCountryOpen={setIsCountryOpen}
            setIsStatusOpen={setIsStatusOpen}
            insertValuesIntoState={insertValuesIntoState}
          />
          <Season
            season={season}
            setSeason={setSeason}
            isSeasonOpen={isSeasonOpen}
            setIsSeasonOpen={setIsSeasonOpen}
            setIsGenreOpen={setIsGenreOpen}
            setIsYearOpen={setIsYearOpen}
            setIsFormatOpen={setIsFormatOpen}
            setIsCountryOpen={setIsCountryOpen}
            setIsStatusOpen={setIsStatusOpen}
            insertValuesIntoState={insertValuesIntoState}
          />
          <Format
            format={format}
            setFormat={setFormat}
            isFormatOpen={isFormatOpen}
            setIsFormatOpen={setIsFormatOpen}
            setIsGenreOpen={setIsGenreOpen}
            setIsYearOpen={setIsYearOpen}
            setIsSeasonOpen={setIsSeasonOpen}
            setIsCountryOpen={setIsCountryOpen}
            setIsStatusOpen={setIsStatusOpen}
            insertValuesIntoState={insertValuesIntoState}
          />
          <Status
            status={status}
            setStatus={setStatus}
            isStatusOpen={isStatusOpen}
            insertValuesIntoState={insertValuesIntoState}
            setIsCountryOpen={setIsCountryOpen}
            setIsFormatOpen={setIsFormatOpen}
            setIsStatusOpen={setIsStatusOpen}
            setIsGenreOpen={setIsGenreOpen}
            setIsYearOpen={setIsYearOpen}
            setIsSeasonOpen={setIsSeasonOpen}
          />
          <Country
            country={country}
            setCountry={setCountry}
            insertValuesIntoState={insertValuesIntoState}
            isCountryOpen={isCountryOpen}
            setIsCountryOpen={setIsCountryOpen}
            setIsYearOpen={setIsYearOpen}
            setIsGenreOpen={setIsGenreOpen}
            setIsSeasonOpen={setIsSeasonOpen}
            setIsFormatOpen={setIsFormatOpen}
            setIsStatusOpen={setIsStatusOpen}
          />
          <Filter
            getSearched={getSearched}
            setIsCountryOpen={setIsCountryOpen}
            setIsYearOpen={setIsYearOpen}
            setIsGenreOpen={setIsGenreOpen}
            setIsSeasonOpen={setIsSeasonOpen}
            setIsFormatOpen={setIsFormatOpen}
            setIsStatusOpen={setIsStatusOpen}
          />
        </form>

        {isLoading ? (
          <section className={styles.loading_Main}>
            <p className={styles.loading_title}>
              Searching result {query ? `for '${query}'` : `...`}
            </p>
            <div className={cardio.cardsContainer}>
              {Array.from({ length: 20 }).map((_, index) => {
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
        ) : results.length > 0 ? (
          <SearchResults
            query={query}
            results={results}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            getSearched={getSearched}
          />
        ) : notFound ? (
          <p className={styles.loading_title}>
            No search result {query && `for '${query}'`}
          </p>
        ) : (
          <>
            <Trending trending={trending} />
            <Popular popular={popular} />
          </>
        )}
      </section>
      <Footer />
    </>
  );
}
