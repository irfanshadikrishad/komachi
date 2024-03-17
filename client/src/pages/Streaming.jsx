import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import Loader from "../components/Loader.jsx";
import Player from "../components/Player.jsx";
import Info from "../components/Info.jsx";
import { Helmet } from "react-helmet";

export default function Streaming() {
  const { SERVER, getRuntimeInMilliseconds } = useAuth();
  const { animeId } = useParams();
  const { search } = useLocation();
  const location = new URLSearchParams(search);
  const providedEpisodeId = location.get("eps")
    ? location.get("eps")
    : localStorage.getItem(animeId);
  const [animeInfo, setAnimeInfo] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [streamLink, setStreamLink] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState(providedEpisodeId);
  const [episodeDownloadLink, setEpisodeDownloadLink] = useState("");
  const [sources, setSources] = useState([]);

  const getStreamLink = async (episodeId) => {
    const startGettingLink = getRuntimeInMilliseconds();
    const request = await fetch(`${SERVER}/api/v1/anime/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ episodeId }),
    });
    const response = await request.json();
    if (request.status === 200) {
      setStreamLink(response.sources[response.sources.length - 1].url);
      setCurrentEpisode(episodeId);
      setEpisodeDownloadLink(response.download);
      // Get Sources
      await getServerSources(episodeId);
      const endGettingLink = getRuntimeInMilliseconds();
      const runtime = endGettingLink - startGettingLink;
      console.log(`[stream-link] ${runtime.toFixed(2)} sec.`);
    } else {
      console.log(response);
    }
  };

  const getAnimeInfo = async () => {
    const startTime = getRuntimeInMilliseconds();
    const request = await fetch(`${SERVER}/api/v1/anime/info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ animeId }),
    });
    const response = await request.json();
    if (request.status === 200) {
      setAnimeInfo(response);
      setEpisodes(response.episodes);
      if (providedEpisodeId) {
        getStreamLink(providedEpisodeId);
      } else {
        getStreamLink(response.episodes[0].id);
      }
      const endTime = getRuntimeInMilliseconds();
      const runtime = endTime - startTime;
      console.log(`[info] ${runtime.toFixed(2)} sec.`);
    } else {
      console.log(response);
    }
  };

  const getServerSources = async (episodeId) => {
    const request = await fetch(`${SERVER}/api/v1/anime/sources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ episodeId }),
    });
    const response = await request.json();
    if (request.status === 200) {
      setSources(response);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getAnimeInfo();
  }, [animeId]);
  return (
    <section className="container streamingV2">
      <Helmet>
        <title>{`Komachi ${
          animeInfo.title ? `/ ${animeInfo.title}` : ""
        }`}</title>
      </Helmet>
      {streamLink ? (
        <Player
          streamLink={streamLink}
          currentEpisode={currentEpisode}
          episodeDownloadLink={episodeDownloadLink}
          episodes={episodes}
          getStreamLink={getStreamLink}
          setStreamLink={setStreamLink}
          sources={sources}
          animeId={animeId}
        />
      ) : animeInfo.totalEpisode !== 0 ? (
        <Loader />
      ) : (
        <p>Not available.</p>
      )}

      {animeInfo.id && <Info animeInfo={animeInfo} />}
    </section>
  );
}
