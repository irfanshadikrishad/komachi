import Card from "@/components/Card"
import cardio from "@/styles/cardio.module.css"
import styles from "@/styles/search.module.css"
// Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

export default function SearchResults({
  query,
  results,
  currentPage,
  totalPages,
  totalCount,
  getSearched,
}: {
  query: null | string
  results: any[]
  currentPage: number | undefined
  totalPages: number | undefined
  totalCount: number | undefined
  getSearched: any
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
                  getSearched(Number(currentPage) - 1)
                }
              }}>
              <FaChevronLeft />
            </button>
            <button
              className={`${currentPage === totalPages ? "" : "primary"}`}
              onClick={() => {
                if (Number(currentPage) + 1 <= Number(totalPages)) {
                  getSearched(Number(currentPage) + 1)
                }
              }}>
              <FaChevronRight />
            </button>
          </div>
        </div>
        <section className={cardio.cardsContainer}>
          {results.map(
            ({
              isAdult,
              id,
              poster,
              episodes,
              totalEpisodes,
              name,
            }: {
              id: string
              poster: string
              episodes: { sub: number; dub: number }
              totalEpisodes: string | number
              name: string
              isAdult: string
            }) => (
              <Card
                key={id}
                id={id}
                image={poster}
                subCount={episodes.sub}
                dubCount={episodes.dub}
                totalCount={totalEpisodes}
                title={name}
                isAdult={isAdult}
              />
            )
          )}
        </section>
      </section>
    </section>
  )
}
