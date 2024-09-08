import Link from "next/link";
import Card from "@/components/Card";
import styles from "@/styles/search.module.css";
import { getTitle } from "@/utils/helpers";

export default function Trending({ trending }: { trending: any[] }) {
  return (
    <section className={styles.billboard_Main}>
      <div className={styles.billboard_HeaderMain}>
        <p className={styles.billboard_Header}>Trending</p>
        <Link href={`/search/trending`}>view all</Link>
      </div>
      <section className={styles.billboard}>
        {trending.map(
          ({
            anilistId,
            poster,
            sub_episodes = [],
            dub_episodes = [],
            totalEpisodes,
            title = { english: "", romaji: "" },
            isAdult,
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
        )}
      </section>
    </section>
  );
}
