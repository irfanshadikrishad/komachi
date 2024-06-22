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
  const [popular, setPopular] = useState([]);

  const getPopularAnime = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/trending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 5 }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setPopular(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularAnime();
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
        {popular &&
          popular.map((pplr, index) => {
            return (
              <SwiperSlide key={index} style={{ position: "relative" }}>
                <div
                  className={styles.board}
                  style={{
                    backgroundImage: `url(${pplr.cover})`,
                  }}
                ></div>
                <div className={styles.elem}>
                  <h1 className={styles.title}>
                    {pplr.title && pplr.title.english
                      ? pplr.title.english
                      : pplr.title.romaji}
                  </h1>
                  <section className={styles.status_Main}>
                    <div className={styles.status_Board}>
                      <button>
                        {pplr.status === "Completed" ? (
                          <MdVerified />
                        ) : (
                          <TbLoader />
                        )}
                      </button>
                      <p>{pplr.status}</p>
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
                    </div>
                  </section>
                  <p className={styles.description}>
                    {String(pplr.description).length > 250
                      ? removeHtmlAndMarkdown(
                          `${String(pplr.description).slice(0, 250)}...`
                        )
                      : removeHtmlAndMarkdown(String(pplr.description))}
                  </p>
                  <div className={styles.boardBtns}>
                    <a href={`/streaming/${pplr.id}`} className={styles.watch}>
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
