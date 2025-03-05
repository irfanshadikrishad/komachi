import Card from "@/components/Card"
import cardio from "@/styles/cardio.module.css"
import styles from "@/styles/search.module.css"
import Link from "next/link"
// Skeleton
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Trending({ trending }: { trending: any[] }) {
  return (
    <section className={styles.billboard_Main}>
      <div className={styles.billboard_HeaderMain}>
        <p className={styles.billboard_Header}>Trending</p>
        <Link href={`/search/trending`}>view all</Link>
      </div>
      <section className={cardio.cardsContainer}>
        {trending.length > 0
          ? trending
              .slice(0, 6)
              .map(
                ({
                  id,
                  poster,
                  episodes,
                  totalEpisodes,
                  name,
                }: {
                  id: string
                  poster: string
                  episodes: { sub?: number; dub?: number }
                  totalEpisodes: string | number
                  name: string
                }) => (
                  <Card
                    key={id}
                    id={id}
                    image={poster}
                    subCount={episodes?.sub || 0}
                    dubCount={episodes?.dub || 0}
                    totalCount={totalEpisodes}
                    title={name}
                    isAdult={"false"}
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
