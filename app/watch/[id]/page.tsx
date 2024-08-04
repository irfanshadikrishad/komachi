"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Player from "@/components/Player";
import Info from "@/components/Info";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Streaming() {
  interface AnimeInfo {
    season: string;
    release_date: any;
    anilistId: {
      type: string;
    };
    malId: { type: string };
    title: {
      english: string;
      romaji: string;
      native: string;
      userPreferred: string;
    };
    description: string;
    poster: string;
    cover: string;
    sub_episodes: [{}];
    dub_episodes: [{}];
    origin: string;
    format: string;
    duration: string;
    status: string;
    airing_start: {
      year: string;
      month: string;
      day: string;
    };
    airing_end: {
      year: string;
      month: string;
      day: string;
    };
    genres: [string];
    synonyms: [string];
    isAdult: string;
    nextAiringEpisode: [
      {
        airingTime: number;
        timeUntilAiring: number;
        episode: number;
      }
    ];
    totalEpisodes: number;
    studios: [string];
    recommendations: [
      {
        animeId: string;
        malId: string;
        title: {
          romaji: string;
          english: string;
          native: string;
          userPreferred: string;
        };
        status: string;
        episodes: number;
        poster: string;
        cover: string;
        rating: number;
        format: string;
      }
    ];
    trailer: {
      id: string;
    };
  }
  //   const { SERVER, getSkipTime } = useAuth();
  const params = useParams();
  const animeId = params.id;
  // const { search } = useLocation();
  // const location = new URLSearchParams(search);
  // let providedEpisodeId: any = location.get("eps")
  //   ? location.get("eps")
  //   : animeId && localStorage.getItem(animeId);
  let providedEpisodeId: any = false; // temporary
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>();
  const [episodes, setEpisodes] = useState<any>([]);
  const [streamLink, setStreamLink] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState<string>();
  const [episodeDownloadLink, setEpisodeDownloadLink] = useState("");
  const [sources, setSources] = useState([]);
  const [dubEpisodes, setDubEpisodes] = useState([]);
  const [nextAiringTime, setNextAiringTime] = useState({});
  const [noEpisodes, setNoEpisodes] = useState(false);

  const getStreamLink = async (episodeId: string) => {
    try {
      if (episodeId) {
        // Make the fetch request
        const request = await fetch(`/api/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ episodeId }),
        });

        const response = await request.json();

        // Handle response
        if (request.status === 200) {
          // Make the default quality to stream
          setStreamLink(response.sources[response.sources.length - 1].url);
          setCurrentEpisode(episodeId);
          setEpisodeDownloadLink(response.download);
          // Get Sources
          await getServerSources(episodeId);
        } else {
          if (Number(episodeId) > episodes.length) {
            await getStreamLink(episodes[0]?.id);
          } else {
            // If it falls between episode range, it should work
            await getStreamLink(episodes[Number(episodeId) - 1]?.id);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching stream link:", error, episodeId);
    }
  };

  const getAnimeInfo = async () => {
    try {
      const request = await fetch(`/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setNextAiringTime(response?.nextAiringEpisode);
        setAnimeInfo(response);
        setEpisodes(response?.sub_episodes);
        setDubEpisodes(response?.dub_episodes); // Get the dub episodes
        // getSkipTime(1, response.malId);
        // For specific episodes
        if (providedEpisodeId) {
          if (Number(providedEpisodeId) === 0) {
            providedEpisodeId = 1;
          }
          try {
            getStreamLink(response.sub_episodes[providedEpisodeId - 1].id);
          } catch (error) {
            getStreamLink(response.dub_episodes[0].id);
          }
        } else {
          try {
            getStreamLink(response.sub_episodes[0].id);
          } catch (error) {
            getStreamLink(response.dub_episodes[0].id);
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
  const getServerSources = async (episodeId: string) => {
    try {
      const request = await fetch(`/api/sources`, {
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
      console.log(error);
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
    <>
      <Navbar />
      <section className="container">
        <section className="streamingV2">
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
              malId={animeInfo?.malId}
            />
          ) : noEpisodes ? (
            animeInfo?.trailer ? (
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
                malId={animeInfo?.malId}
              />
            ) : (
              <p>No episodes or trailer available.</p>
            )
          ) : (
            <Loader />
          )}

          {animeInfo?.anilistId && <Info animeInfo={animeInfo} />}
        </section>
      </section>
      <Footer />
    </>
  );
}
