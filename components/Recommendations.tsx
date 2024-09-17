import Card from "@/components/Card";
import styles from "@/styles/recommendations.module.css";
import { getTitle } from "@/utils/helpers";

export default function Recommendations({
  recommendations,
}: {
  recommendations: any[];
}) {
  return (
    <section className={styles.wrapper}>
      {recommendations.length > 0 && <h1>Recommendations</h1>}
      <div className={styles.cards}>
        {recommendations.length > 0 &&
          recommendations
            .slice(0, 7)
            .map(
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
                index: number
              ) => {
                return (
                  <Card
                    key={index}
                    id={anilistId}
                    image={poster}
                    title={getTitle(title)}
                    subCount={sub_episodes.length}
                    dubCount={dub_episodes.length}
                    totalCount={totalEpisodes}
                    isAdult={isAdult}
                  />
                );
              }
            )}
      </div>
    </section>
  );
}
