import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import Player from "../components/Player.jsx";
import Info from "../components/Info.jsx";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader.jsx";
import Recommendations from "../components/Recommendations.jsx";
import { hasRepeatedWords } from "../utils/info_modifier.js";
import {
  getSubEpisodesFromGoGo,
  getDubEpisodesFromGoGo,
} from "../utils/episodes.js";

export default function Streaming() {
  const { SERVER, getSkipTime } = useAuth();
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
  const [dubEpisodes, setDubEpisodes] = useState([]);
  const [nextAiringTime, setNextAiringTime] = useState({});
  const [noEpisodes, setNoEpisodes] = useState(false);

  const getStreamLink = async (episodeId) => {
    try {
      if (episodeId) {
        // New Method
        if (episodeId.includes("dub")) {
          dubEpisodes.map(async (eps) => {
            if (episodeId === eps.id) {
              setStreamLink(
                eps.sources.sources[eps.sources.sources.length - 1].url
              );
              setEpisodeDownloadLink(eps.sources.sources.download);
              setCurrentEpisode(eps.id);
              await getServerSources(eps.id);
            }
          });
        } else {
          episodes.map(async (eps) => {
            if (episodeId === eps.id) {
              setStreamLink(
                eps.sources.sources[eps.sources.sources.length - 1].url
              );
              setEpisodeDownloadLink(eps.sources.sources.download);
              setCurrentEpisode(eps.id);
            }
            // Get External Sources | eg: Vidstreaming, Gogo, Streamwish ...
            await getServerSources(eps.id);
          });
        }
      }
    } catch (error) {
      console.error("Error fetching stream link:", error, episodeId);
    }
  };

  const getAnimeInfo = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setNextAiringTime(response.nextAiringEpisode);
        setAnimeInfo(response);
        setEpisodes(response.sub_episodes);
        setDubEpisodes(response.dub_episodes); // Get the dub episodes
        getSkipTime(1, response.malId);
        // For specific episodes
        if (providedEpisodeId) {
          const episodePrefix = response.sub_episodes[0].id;
          let unicornId = episodePrefix.split("-");
          unicornId.pop(); // removing initial episode id
          unicornId = unicornId.join("-");
          unicornId = unicornId + `-${providedEpisodeId}`;
          // If overwriting results in repetation of words
          if (hasRepeatedWords(unicornId)) {
            getStreamLink(providedEpisodeId);
          } else {
            getStreamLink(unicornId);
          }
        } else {
          if (response.sub_episodes.length > 0) {
            getStreamLink(response.sub_episodes[0].id);
          } else {
            setNoEpisodes(true);
          }
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Individual Episode Sources
  const getServerSources = async (episodeId) => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/sources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeId }),
      });
      const response = await request.json();
      if (request.status === 200) {
        setSources(response);
      } else {
        console.log(response, episodeId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!streamLink) {
      getStreamLink(providedEpisodeId);
    }
  }, [episodes]);
  useEffect(() => {
    setDubEpisodes([]);
    getAnimeInfo();
    window.scrollTo({ top: 0 }); // On click recommended, scroll to top
  }, [animeId]);
  return (
    <section className="container">
      <section className="streamingV2">
        <Helmet>
          <title>{`Konami ${
            animeInfo.title
              ? `/ ${
                  animeInfo.title.english
                    ? animeInfo.title.english
                    : animeInfo.title.romaji
                }`
              : ""
          }`}</title>
          <meta
            name="description"
            content={`Watch ${animeInfo.title} online : ${animeInfo.description}`}
          />
          <meta
            name="keywords"
            content={`konami, ${animeInfo.title}, ${animeInfo.totalEpisode} episodes`}
          />
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
            dubEpisodes={dubEpisodes}
            nextAiringEpisode={nextAiringTime}
            malId={animeInfo.malId}
          />
        ) : noEpisodes ? (
          animeInfo.trailer ? (
            <Player
              currentEpisode={currentEpisode}
              episodeDownloadLink={episodeDownloadLink}
              episodes={episodes}
              getStreamLink={getStreamLink}
              setStreamLink={setStreamLink}
              sources={sources}
              animeId={animeId}
              dubEpisodes={dubEpisodes}
              nextAiringEpisode={nextAiringTime}
              streamLink={`https://www.youtube.com/watch?v=${animeInfo.trailer.id}`}
            />
          ) : (
            <p>No episodes or trailer available.</p>
          )
        ) : (
          <Loader />
        )}

        {animeInfo.anilistId && <Info animeInfo={animeInfo} />}
      </section>
      {/* <Recommendations
        recommendations={
          animeInfo.recommendations && animeInfo.recommendations.slice(0, 13)
        }
      /> */}
    </section>
  );
}
