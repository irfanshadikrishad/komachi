import Card from "@/components/Card";
import styles from "@/styles/recommendations.module.css";
import { getTitle } from "@/utils/helpers";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function Recommendations({
  recommendations,
}: {
  recommendations: any[];
}) {
  const [to, setTo] = useState(7);

  return (
    <section className={styles.wrapper}>
      {recommendations.length > 0 && (
        <div className={styles.recHeader}>
          <h1>Recommendations</h1>
          <div>
            <button
              className={styles.downBtn}
              onClick={() => {
                if (to === 7) {
                  setTo(recommendations.length);
                } else {
                  setTo(7);
                }
              }}
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      )}
      <div className={styles.cards}>
        {recommendations.length > 0 &&
          recommendations
            .slice(0, to)
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
