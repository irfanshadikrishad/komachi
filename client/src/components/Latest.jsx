import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";
import LatestCard from "./LatestCard.jsx";
import Loader from "./Loader.jsx";
import styles from "../styles/latest.module.css";
// ICONS
import { TbMicrophoneFilled } from "react-icons/tb";
import { FaClosedCaptioning } from "react-icons/fa6";
import { CgMediaLive } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Latest() {
  const { SERVER } = useAuth();
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);

  const getPopular = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/popular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 10 }),
      });
      const response = await request.json();
      console.log(response);
      if (request.status === 200) {
        setPopular(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLatest = async () => {
    const request = await fetch(`${SERVER}/api/v1/anime/recent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1 }),
    });
    const response = await request.json();

    if (request.status === 200) {
      setLatest(response);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getLatest();
    getPopular();
  }, []);
  return (
    <section className={`container`}>
      <section className={styles.latest_Main}>
        <section className={styles.latest_updates}>
          {latest && (
            <div className="latest_Header">
              <p className="partitionTitleII">Latest updates</p>
            </div>
          )}
          <div className="latestContainer">
            {latest.length > 0 ? (
              latest.map(
                (
                  {
                    anilistId,
                    poster,
                    title,
                    sub_episodes,
                    dub_episodes,
                    isAdult,
                  },
                  index
                ) => {
                  return (
                    <LatestCard
                      key={index}
                      id={anilistId}
                      image={poster}
                      title={title.english ? title.english : title.romaji}
                      currentEpisode={
                        sub_episodes.length
                          ? sub_episodes.length
                          : dub_episodes.length
                      }
                      isAdult={isAdult}
                    />
                  );
                }
              )
            ) : (
              <Loader />
            )}
          </div>
        </section>
        <section className="home_ranking">
          <section className="home_popular">
            <div className="latest_Header">
              <p className="partitionTitleII">Ranking</p>
            </div>
            <section className={styles.ranking_wrapper}>
              {popular[0]?.anilistId && (
                <Link to={`/streaming/${popular[0].anilistId}`}>
                  <div className={styles.rank1_container}>
                    {popular[0]?.poster && (
                      <img
                        src={`${popular[0]?.poster}`}
                        alt={`${
                          popular[0].title?.english
                            ? popular[0].title?.english
                            : popular[0].title?.romaji
                        }`}
                        className={styles.rank1_image}
                        draggable="false"
                      />
                    )}
                    <div className={styles.rank_Main}>
                      <div className={styles.rank_Number}>
                        <h4>1</h4>
                      </div>
                      <div>
                        <h3>
                          {popular[0].title?.english
                            ? String(popular[0].title?.english).slice(0, 23)
                            : String(popular[0].title?.romaji).slice(0, 23)}
                        </h3>
                        <div className={styles.rank_details}>
                          <div className={styles.episodes_count}>
                            <div className={styles.count_Wrapper}>
                              {<FaClosedCaptioning />}
                              {popular[0].sub_episodes?.length}
                            </div>
                            {popular[0].dub_episodes?.length > 0 && (
                              <div className={styles.count_Wrapper}>
                                {<TbMicrophoneFilled />}
                                {popular[0].dub_episodes?.length}
                              </div>
                            )}
                            <div className={styles.count_Wrapper}>
                              {<CgMediaLive />}
                              {popular[0]?.totalEpisodes}
                            </div>
                          </div>
                          <p>•</p>
                          <p>{popular[0]?.format}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
              <section className={styles.other_ranks}>
                {popular.map(
                  (
                    {
                      title,
                      sub_episodes,
                      dub_episodes,
                      format,
                      totalEpisodes,
                      poster,
                      anilistId,
                    },
                    index
                  ) => {
                    if (index !== 0) {
                      return (
                        <div key={index + 1}>
                          <Link
                            to={`/streaming/${anilistId}`}
                            className={styles.rank_Main_Others}
                          >
                            <section
                              style={{
                                display: "flex",
                                gap: "10px",
                              }}
                            >
                              <div
                                className={`${styles.rank_Number} ${styles.rank_Number_Others}`}
                              >
                                <h4>{index + 1}</h4>
                              </div>
                              <div>
                                <h4 className={styles.others_rank}>
                                  {title?.english
                                    ? title?.english
                                    : title?.romaji}
                                </h4>
                                <div className={styles.rank_details}>
                                  <div className={styles.episodes_count}>
                                    <div className={styles.count_Wrapper}>
                                      {<FaClosedCaptioning />}
                                      {sub_episodes?.length}
                                    </div>
                                    {dub_episodes.length > 0 && (
                                      <div className={styles.count_Wrapper}>
                                        {<TbMicrophoneFilled />}
                                        {dub_episodes?.length}
                                      </div>
                                    )}
                                    <div className={styles.count_Wrapper}>
                                      {<CgMediaLive />}
                                      {totalEpisodes}
                                    </div>
                                  </div>
                                  <p>•</p>
                                  <p>{format}</p>
                                </div>
                              </div>
                            </section>
                            <img
                              className={styles.others_Poster}
                              src={`${poster}`}
                            />
                          </Link>
                        </div>
                      );
                    }
                  }
                )}
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
