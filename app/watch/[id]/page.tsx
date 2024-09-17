"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Player from "@/components/Player";
import Info from "@/components/Info";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimeInfo, extractDefaultSource } from "@/utils/helpers";
import styles from "@/styles/watch.module.css";
import Episodes from "@/components/Episodes";

export default function Streaming() {
  const params = useParams();
  const animeId = params.id;
  const eps = useSearchParams().get("eps");
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>();
  const [episodes, setEpisodes] = useState<any>([]);
  const [streamLink, setStreamLink] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState<string>();
  const [episodeDownloadLink, setEpisodeDownloadLink] = useState("");
  const [sources, setSources] = useState([]);
  const [dubEpisodes, setDubEpisodes] = useState([]);
  const [nextAiringTime, setNextAiringTime] = useState({});
  const [notFound, setNotFound] = useState(false);

  const getStreamLink = async (episodeId: string) => {
    try {
      if (episodeId && episodeId !== "undefined") {
        const request = await fetch(`/api/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ episodeId }),
        });
        const response = await request.json();

        if (request.status === 200) {
          setStreamLink(String(extractDefaultSource(response?.sources)));
          setCurrentEpisode(episodeId);
          setEpisodeDownloadLink(response.download);
        } else {
          console.log(response);
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
        setDubEpisodes(response?.dub_episodes);
        setCurrentEpisode(
          response?.sub_episodes[0]?.id
            ? response?.sub_episodes[0]?.id
            : response?.dub_episodes[0]?.id
        );
        if (response?.sub_episodes[0]?.id) {
          getStreamLink(
            eps
              ? response?.sub_episodes[Number(eps) - 1]?.id
              : response?.sub_episodes[0]?.id
          );
        } else if (response?.dub_episodes[0]?.id) {
          getStreamLink(
            eps
              ? response?.dub_episodes[Number(eps) - 1]?.id
              : response?.dub_episodes[0]?.id
          );
        }
      } else {
        console.log(response);
        setNotFound(true);
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
    getAnimeInfo();
  }, [eps]);
  useEffect(() => {
    setDubEpisodes([]);
    window.scrollTo({ top: 0 });
  }, [animeId, eps]);
  return (
    <>
      <Navbar />
      <section className="container">
        {!notFound ? (
          <section className={styles.watchContainer}>
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
              animeInfo={animeInfo}
            />
          </section>
        ) : (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <Image
              src={"/not_found.png"}
              alt="not_found image"
              width={300}
              height={280}
              draggable="false"
            />
            <h1>not-found or unavailable</h1>
          </section>
        )}
      </section>
      <Footer />
    </>
  );
}
