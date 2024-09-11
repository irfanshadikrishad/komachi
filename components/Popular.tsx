import Link from "next/link";
import Card from "@/components/Card";
import styles from "@/styles/search.module.css";
import cardio from "@/styles/cardio.module.css";
import { getTitle } from "@/utils/helpers";
// Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Popular({ popular }: { popular: any[] }) {
  return (
    <section className={styles.billboard_Main}>
      <div className={styles.billboard_HeaderMain}>
        <p className={styles.billboard_Header}>Popular</p>
        <Link href={`/search/popular`}>view all</Link>
      </div>
      <section className={cardio.cardsContainer}>
        {popular.length > 0
          ? popular.map(
              ({
                anilistId,
                poster,
                sub_episodes,
                dub_episodes,
                totalEpisodes,
                title,
                isAdult,
              }: {
                anilistId: string;
                poster: string;
                sub_episodes: [];
                dub_episodes: [];
                totalEpisodes: string | number;
                title: { english?: string; romaji?: string; native?: string };
                isAdult: string;
              }) => (
                <Card
                  key={anilistId}
                  id={anilistId}
                  image={poster}
                  subCount={sub_episodes.length}
                  dubCount={dub_episodes.length}
                  totalCount={totalEpisodes}
                  title={getTitle(title)}
                  isAdult={isAdult}
                />
              )
            )
          : Array.from({ length: 7 }).map((_, index: number) => {
              return (
                <Skeleton
                  key={index}
                  height={273}
                  baseColor="var(--secondary)"
                  highlightColor="var(--background)"
                />
              );
            })}
      </section>
    </section>
  );
}
