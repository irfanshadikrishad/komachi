import Card from "@/components/Card";
import styles from "@/styles/search.module.css";
import cardio from "@/styles/cardio.module.css";
import { getTitle } from "@/utils/helpers";
// Icons
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

export default function SearchResults({
  query,
  results,
  currentPage,
  totalPages,
  totalCount,
  getSearched,
}: {
  query: null | string;
  results: any[];
  currentPage: number | undefined;
  totalPages: number | undefined;
  totalCount: number | undefined;
  getSearched: any;
}) {
  return (
    <section className={styles.billboard_Wrapper}>
      <section className={styles.billboard_Main}>
        <div className={styles.billboard_HeaderMain}>
          <p className={styles.billboard_Header}>
            {query !== null &&
              `Search result for '${query}' (${totalCount}) [${currentPage}/${totalPages}]`}
          </p>
          <div className={styles.pageBtns}>
            <button
              className={`${Number(currentPage) <= 1 ? "" : "primary"}`}
              onClick={() => {
                if (Number(currentPage) > 1) {
                  getSearched(Number(currentPage) - 1);
                }
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              className={`${currentPage === totalPages ? "" : "primary"}`}
              onClick={() => {
                if (Number(currentPage) + 1 <= Number(totalPages)) {
                  getSearched(Number(currentPage) + 1);
                }
              }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <section className={cardio.cardsContainer}>
          {results.map(
            ({
              isAdult,
              anilistId,
              poster,
              sub_episodes,
              dub_episodes,
              totalEpisodes,
              title,
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
          )}
        </section>
      </section>
    </section>
  );
}
