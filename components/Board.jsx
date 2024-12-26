"use client"
import styles from "@/styles/board.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
// ICONS
import { AiFillThunderbolt } from "react-icons/ai"
import { BsBookmarkStar } from "react-icons/bs"
import { FaClosedCaptioning, FaRegCirclePlay } from "react-icons/fa6"
import { MdVerified } from "react-icons/md"
import { TbLoader, TbMicrophoneFilled } from "react-icons/tb"
// Swiper
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
// Skeleton
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
// Utils
import { removeHtmlAndMarkdown } from "@/utils/helpers"

export default function Board() {
  const [boardInfo, setBoardInfo] = useState([])

  const getBoardAnimes = async () => {
    try {
      const request = await fetch(`/api/spotlight`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ page: 1, perPage: 6 }),
      })
      const response = await request.json()
      // console.log(response)

      if (request.status === 200) {
        setBoardInfo(response)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBoardAnimes()
  }, [])
  return (
    <section className="container">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={false}>
        {boardInfo.length > 0 ? (
          boardInfo.map((bored, index) => {
            return (
              <SwiperSlide key={index} style={{ position: "relative" }}>
                <div
                  className={styles.board}
                  style={{
                    backgroundImage: `url(${bored.poster})`,
                  }}></div>
                <div className={styles.elem}>
                  <h1 className={`two_line ${styles.title}`}>{bored.name}</h1>
                  <section className={styles.status_Main}>
                    {/* <div className={styles.status_Board}>
                      <button>
                        {bored.status === "Completed" ? (
                          <MdVerified />
                        ) : (
                          <TbLoader />
                        )}
                      </button>
                      <p>{bored.status}</p>
                    </div> */}
                    <div className={styles.status_Board}>
                      <button>
                        <AiFillThunderbolt />
                      </button>
                      <p>{`Ranking #${bored.rank}`}</p>
                    </div>
                    <div className={styles.episode_stats}>
                      <button>
                        <FaClosedCaptioning />
                      </button>
                      <p>{bored.episodes.sub}</p>
                    </div>
                    {bored.episodes.dub > 0 && (
                      <div className={`${styles.episode_stats} ${styles.dub}`}>
                        <button>
                          <TbMicrophoneFilled />
                        </button>
                        <p>{bored.episodes.dub}</p>
                      </div>
                    )}
                  </section>
                  <p className={`two_line ${styles.description}`}>
                    {removeHtmlAndMarkdown(bored.description)}
                  </p>
                  <div className={styles.boardBtns}>
                    <Link href={`/watch/${bored?.id}`} className={styles.watch}>
                      {<FaRegCirclePlay />} Watch now
                    </Link>
                    <button disabled className={styles.bookmark}>
                      {<BsBookmarkStar />}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            )
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
  )
}
