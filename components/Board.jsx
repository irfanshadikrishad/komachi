"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/board.module.css";
// ICONS
import { FaRegCirclePlay, FaClosedCaptioning } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { TbMicrophoneFilled, TbLoader } from "react-icons/tb";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
// Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// Utils
import { removeHtmlAndMarkdown } from "@/utils/helpers";

export default function Board() {
  const [boardInfo, setBoardInfo] = useState([]);

  const getBoardAnimes = async () => {
    try {
      const request = await fetch(`/api/trending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 6 }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setBoardInfo(response.results);
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
        navigation={false}
      >
        {boardInfo.length > 0 ? (
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
                  <h1 className={`two_line ${styles.title}`}>
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
                      <div className={`${styles.episode_stats} ${styles.dub}`}>
                        <button>
                          <TbMicrophoneFilled />
                        </button>
                        <p>{bored.dub_episodes.length}</p>
                      </div>
                    )}
                  </section>
                  <p className={`two_line ${styles.description}`}>
                    {removeHtmlAndMarkdown(bored.description)}
                  </p>
                  <div className={styles.boardBtns}>
                    <Link
                      href={`/watch/${bored?.anilistId}`}
                      className={styles.watch}
                    >
                      {<FaRegCirclePlay />} Watch now
                    </Link>
                    <button disabled className={styles.bookmark}>
                      {<BsBookmarkStar />}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <Skeleton
            height={320}
            baseColor="var(--secondary)"
            highlightColor="var(--background)"
          />
        )}
      </Swiper>
    </section>
  );
}
