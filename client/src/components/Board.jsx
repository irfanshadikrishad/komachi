import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import styles from "../styles/board.module.css";
// ICONS
import { FaRegCirclePlay } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";
import { MdVerified } from "react-icons/md"; // for completed
import { AiFillThunderbolt } from "react-icons/ai";
import { TbMicrophoneFilled } from "react-icons/tb";
import { FaClosedCaptioning } from "react-icons/fa6";
import { TbLoader } from "react-icons/tb"; // Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
// Utils
import { removeHtmlAndMarkdown } from "../utils/info_modifier";

export default function Board() {
  const { SERVER } = useAuth();
  const [boardInfo, setBoardInfo] = useState([]);

  const getBoardAnimes = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/board`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await request.json();

      if (request.status === 200) {
        setBoardInfo(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoardAnimes();
  }, []);
  return (
    <section className="container">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
      >
        {boardInfo.length > 0 &&
          boardInfo.map((bored, index) => {
            return (
              <SwiperSlide key={index} style={{ position: "relative" }}>
                <div
                  className={styles.board}
                  style={{
                    backgroundImage: `url(${bored.cover})`,
                  }}
                ></div>
                <div className={styles.elem}>
                  <h1 className={styles.title}>
                    {bored.title.english
                      ? bored.title.english
                      : bored.title.romaji}
                  </h1>
                  <section className={styles.status_Main}>
                    <div className={styles.status_Board}>
                      <button>
                        {bored.status === "Completed" ? (
                          <MdVerified />
                        ) : (
                          <TbLoader />
                        )}
                      </button>
                      <p>{bored.status}</p>
                    </div>
                    <div className={styles.status_Board}>
                      <button>
                        <AiFillThunderbolt />
                      </button>
                      <p>{`Ranking #${index + 1}`}</p>
                    </div>
                    <div className={styles.episode_stats}>
                      <button>
                        <FaClosedCaptioning />
                      </button>
                      <p>{bored.sub_episodes.length}</p>
                    </div>
                    {bored.dub_episodes.length > 0 && (
                      <div className={styles.episode_stats}>
                        <button>
                          <TbMicrophoneFilled />
                        </button>
                        <p>{bored.dub_episodes.length}</p>
                      </div>
                    )}
                  </section>
                  <p className={styles.description}>
                    {bored.description && String(bored.description).length > 150
                      ? removeHtmlAndMarkdown(
                          `${String(bored.description).slice(0, 150)}...`
                        )
                      : removeHtmlAndMarkdown(String(bored.description))}
                  </p>
                  <div className={styles.boardBtns}>
                    <a
                      href={`/streaming/${bored?.anilistId}`}
                      className={styles.watch}
                    >
                      {<FaRegCirclePlay />} Watch now
                    </a>
                    <button disabled className={styles.bookmark}>
                      {<BsBookmarkStar />}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
}
