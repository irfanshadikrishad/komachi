import styles from "@/styles/info.module.css"
import { getTitle, removeHtmlAndMarkdown } from "@/utils/helpers"
import Link from "next/link"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import uniqolor from "uniqolor"

export default function Info({ animeInfo }) {
  const { color } = uniqolor(animeInfo?.anilistId)

  return (
    <section className={styles.infoMain}>
      <section className={styles.seperator}>
        <div className={styles.posterContainer}>
          {animeInfo?.poster ? (
            <img
              className={styles.poster}
              src={animeInfo?.poster}
              alt={String(animeInfo?.anilistId)}
              draggable="false"
            />
          ) : (
            <Skeleton
              baseColor="var(--background)"
              highlightColor="var(--secondary)"
              width={150}
              height={200}
            />
          )}
        </div>
        <section>
          <h1 className={styles.title}>
            {animeInfo?.name ? (
              animeInfo.name
            ) : (
              <Skeleton
                baseColor="var(--background)"
                highlightColor="var(--secondary)"
                height={25}
                width={200}
              />
            )}
          </h1>
          <p className={styles.description}>
            {animeInfo?.description ? (
              removeHtmlAndMarkdown(animeInfo?.description)
            ) : (
              <Skeleton
                baseColor="var(--background)"
                highlightColor="var(--secondary)"
                count={10}
              />
            )}
          </p>
          {/* <section>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Status :</span>
              {animeInfo?.anilistId ? (
                animeInfo?.status
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
          </section> */}
        </section>
      </section>
    </section>
  )
}
