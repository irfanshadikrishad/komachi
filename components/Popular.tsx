import Card from "@/components/Card"
import cardio from "@/styles/cardio.module.css"
import styles from "@/styles/search.module.css"
import Link from "next/link"
// Skeleton
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Popular({ popular }: { popular: any[] }) {
  return (
    <section className={styles.billboard_Main}>
      <div className={styles.billboard_HeaderMain}>
        <p className={styles.billboard_Header}>Popular</p>
        <Link href={`/search/popular`}>view all</Link>
      </div>
      <section className={cardio.cardsContainer}>
        {popular.length > 0
          ? popular
              .slice(0, 6)
              .map(
                ({
                  id,
                  poster,
                  episodes,
                  totalEpisodes,
                  name,
                  isAdult,
                }: {
                  id: string
                  poster: string
                  episodes: { sub?: number; dub?: number }
                  totalEpisodes: string | number
                  name: string
                  isAdult: string
                }) => (
                  <Card
                    key={id}
                    id={id}
                    image={poster}
                    subCount={episodes?.sub || 0}
                    dubCount={episodes?.dub || 0}
                    totalCount={totalEpisodes}
                    title={name}
                    isAdult={isAdult}
                  />
                )
              )
          : Array.from({ length: 6 }).map((_, index: number) => {
              return (
                <Skeleton
                  key={index}
                  height={273}
                  baseColor="var(--secondary)"
                  highlightColor="var(--background)"
                />
              )
            })}
      </section>
    </section>
  )
}
