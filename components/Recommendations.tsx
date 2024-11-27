import styles from "@/styles/recommendations.module.css"
import { getTitle } from "@/utils/helpers"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import Card from "./Card"

export default function Recommendations({
  recommendations,
}: {
  recommendations: any[]
}) {
  return (
    <section>
      <div className={styles.wrapper}>
        <p>Recommendations</p>
      </div>
      <Swiper
        className="container"
        slidesPerView={7}
        spaceBetween={5}
        style={{ position: "absolute" }}>
        {recommendations.length > 0 &&
          recommendations.map(
            (
              {
                anilistId,
                poster,
                sub_episodes,
                dub_episodes,
                totalEpisodes,
                isAdult,
                title,
              },
              idx: number
            ) => {
              return (
                <SwiperSlide>
                  <Card
                    key={idx}
                    id={anilistId}
                    image={poster}
                    title={getTitle(title)}
                    subCount={sub_episodes.length}
                    dubCount={dub_episodes.length}
                    totalCount={totalEpisodes}
                    isAdult={isAdult}
                  />
                </SwiperSlide>
              )
            }
          )}
      </Swiper>
    </section>
  )
}
