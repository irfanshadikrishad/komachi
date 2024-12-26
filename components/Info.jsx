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
          {animeInfo?.info?.poster ? (
            <img
              className={styles.poster}
              src={animeInfo?.info?.poster}
              alt={String(animeInfo?.info?.id)}
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
            {animeInfo?.info?.name ? (
              animeInfo.info.name
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
            {animeInfo?.info?.description ? (
              removeHtmlAndMarkdown(animeInfo?.info?.description)
            ) : (
              <Skeleton
                baseColor="var(--background)"
                highlightColor="var(--secondary)"
                count={10}
              />
            )}
          </p>
          <section>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Status :</span>
              {animeInfo?.moreInfo?.status ? (
                animeInfo?.moreInfo?.status
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Duration :</span>
              {animeInfo?.moreInfo?.duration ? (
                animeInfo?.moreInfo?.duration
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Aired :</span>
              {animeInfo?.moreInfo?.aired ? (
                animeInfo?.moreInfo?.aired
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Studios :</span>
              {animeInfo?.moreInfo?.studios ? (
                animeInfo?.moreInfo?.studios
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Premiered :</span>
              {animeInfo?.moreInfo?.premiered ? (
                animeInfo?.moreInfo?.premiered
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Score :</span>
              {animeInfo?.moreInfo?.malscore ? (
                animeInfo?.moreInfo?.malscore
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Synonyms :</span>
              {animeInfo?.moreInfo?.synonyms ? (
                animeInfo?.moreInfo?.synonyms
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Producers :</span>
              {animeInfo?.moreInfo?.producers ? (
                animeInfo?.moreInfo?.producers.join(", ")
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Genres :</span>
              {animeInfo?.moreInfo?.genres ? (
                animeInfo?.moreInfo?.genres.join(", ")
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
          </section>
        </section>
      </section>
    </section>
  )
}
