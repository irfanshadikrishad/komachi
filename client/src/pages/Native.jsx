import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import styles from "../styles/Native.module.css";
import NativeInfo from "../components/NativeInfo";
import NativePlayer from "../components/NativePlayer";

export default function Native() {
  const { SERVER, fullPageLoader, setFullPageLoader } = useAuth();
  const { animeId } = useParams();
  const [animeInfo, setAnimeInfo] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState();

  const getNativeAnimeDetails = async () => {
    const request = await fetch(`${SERVER}/api/native/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animeId }),
    });
    const response = await request.json();
    if (request.status === 200) {
      setFullPageLoader(false);
      setAnimeInfo(response);
      setEpisodes(response.episodes);
      // get last watched episode
      JSON.parse(localStorage.getItem(animeId))
        ? setCurrentEpisode(JSON.parse(localStorage.getItem(animeId)))
        : setCurrentEpisode(response.episodes[0]);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getNativeAnimeDetails();
  }, [animeId]);
  return (
    <section className={`container ${styles.native}`}>
      <Helmet>
        <title>{`Konami ${
          animeInfo.title ? `/ ${animeInfo.title}` : ""
        }`}</title>
        <meta
          name="description"
          content={`Watch ${animeInfo.title} online : ${animeInfo.description}`}
        />
        <meta name="keywords" content={`Konami, ${animeInfo.title}`} />
      </Helmet>
      {!fullPageLoader && currentEpisode && (
        <NativePlayer
          styles={styles}
          currentEpisode={currentEpisode}
          episodes={episodes}
          setCurrentEpisode={setCurrentEpisode}
          animeId={animeId}
        />
      )}
      {!fullPageLoader && animeInfo.animeId && (
        <NativeInfo styles={styles} animeInfo={animeInfo} />
      )}
    </section>
  );
}
