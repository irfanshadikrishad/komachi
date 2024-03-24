import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Helmet } from "react-helmet";

export default function NativeHome() {
  const { SERVER, defaultPoster, fullPageLoader, setFullPageLoader } =
    useAuth();
  const [latestAnimes, setLatestAnimes] = useState([]);

  const getLatest = async () => {
    const request = await fetch(`${SERVER}/api/native/latest`);
    const response = await request.json();
    if (request.status === 200) {
      setFullPageLoader(false);
      setLatestAnimes(response);
    } else {
      console.log(request.status, response);
    }
  };

  useEffect(() => {
    getLatest();
  }, []);
  return (
    <section className="container">
      <Helmet>
        <title>Konami (native)</title>
        <meta name="description" content="Konami native streaming" />
        <meta
          name="keywords"
          content="Konami, native streaming, watch anime online, anime in hindi"
        />
      </Helmet>
      {!fullPageLoader && (
        <div className="latest_Header">
          <p className="partitionTitleII">Recently added</p>
        </div>
      )}
      {!fullPageLoader && (
        <div className="latestContainer">
          {latestAnimes &&
            latestAnimes.map((late) => {
              return (
                <a
                  key={late.animeId}
                  href={`/native/${late.animeId}`}
                  className="latestIndividual"
                >
                  <img
                    className="latestPoster"
                    src={late.poster}
                    alt={`${late.animeId}`}
                    onError={(e) => {
                      e.target.src = defaultPoster;
                    }}
                  />
                  <p className="latestTitle">{late.title}</p>
                  <p className="latestEpisodeNumber">
                    {late.format}{" "}
                    {late.totalEpisodes && `[${late.totalEpisodes}]`}
                  </p>
                </a>
              );
            })}
        </div>
      )}
    </section>
  );
}
