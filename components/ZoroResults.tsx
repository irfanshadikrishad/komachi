import Card from "@/components/Card"
import cardio from "@/styles/cardio.module.css"
import styles from "@/styles/search.module.css"
import { getTitle } from "@/utils/helpers"
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
              dub,
              duration,
              episodes,
              sub,
              id,
              image,
              title,
              type,
              nsfw,
            }: {
              dub: number
              duration: string
              episodes: number
              sub: number
              id: string
              title: string
              image: string
              type: string
              nsfw: boolean
            }) => (
              <Card
                key={id}
                id={id}
                image={image}
                subCount={sub}
                dubCount={dub}
                totalCount={episodes}
                title={title}
                isAdult={String(nsfw)}
              />
            )
          )}
        </section>
      </section>
    </section>
  )
}
