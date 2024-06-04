import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader.jsx";

export default function Search() {
  const { SERVER, getRuntimeInMilliseconds } = useAuth();
  const { query } = useParams();
  const [searched, setSearched] = useState([]);

  const getSearched = async () => {
    const startSearching = getRuntimeInMilliseconds();
    const request = await fetch(`${SERVER}/api/v1/anime/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchQuery: query }),
    });
    const response = await request.json();
    if (request.status === 200) {
      setSearched(response);
      const endSearching = getRuntimeInMilliseconds();
      const runtime = endSearching - startSearching;
      console.log(`[search] ${runtime.toFixed(2)} sec.`);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getSearched();
  }, [query]);
  return (
    <section className="container">
      <Helmet>
        <title>{`Konami / ${query}`}</title>
        <meta name="description" content="Konami - Search for anime" />
        <meta
          name="keywords"
          content="konami, search anime, watch anime online"
        />
      </Helmet>

      {searched.length > 0 ? (
        <>
          <p>
            {searched.length > 0
              ? `search results for '${query}' / ${searched.length} found`
              : `no search results for '${query}'`}
          </p>
          <div className="searchContainerMain">
            {searched &&
              searched.map(({ image, title, id }, index) => {
                return (
                  <NavLink
                    to={`/streaming/${id}`}
                    key={index}
                    className="searchIndividual"
                  >
                    <img
                      src={image}
                      alt={id}
                      className="searchPoster"
                      draggable="false"
                    />
                    <p>{title.english ? title.english : title.romaji}</p>
                  </NavLink>
                );
              })}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}
