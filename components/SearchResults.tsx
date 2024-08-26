import Card from "@/components/Card";
import styles from "@/styles/search.module.css";

export default function SearchResults({
  query,
  searched,
}: {
  query: null | string;
  searched: any[];
}) {
  return (
    <section className={styles.billboard_Wrapper}>
      <section className={styles.billboard_Main}>
        <div className={styles.billboard_HeaderMain}>
          <p className={styles.billboard_Header}>
            {query !== null && `Search result for '${query}'`}
          </p>
        </div>
        <section className={styles.billboard}>
          {searched.map(
            ({
              isAdult,
              anilistId,
              poster,
              sub_episodes,
              dub_episodes,
              totalEpisodes,
              title = { english: "", romaji: "" },
            }) => (
              <Card
                key={anilistId}
                id={anilistId}
                image={poster}
                subCount={sub_episodes.length}
                dubCount={dub_episodes.length}
                totalCount={totalEpisodes}
                title={title.english ? title.english : title.romaji}
                isAdult={isAdult}
              />
            )
          )}
        </section>
      </section>
    </section>
  );
}
