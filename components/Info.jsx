import styles from "@/styles/info.module.css"
import { removeHtmlAndMarkdown } from "@/utils/helpers"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Info({ animeInfo = {} }) {
  const info = animeInfo?.info || {}
  const moreInfo = animeInfo?.moreInfo || {}

  return (
    <section className={styles.infoMain}>
      <section className={styles.seperator}>
        <div className={styles.posterContainer}>
          {info?.poster ? (
            <img
              className={styles.poster}
              src={info?.poster}
              alt={String(info?.id)}
              draggable="false"
              onError={(e) => {
                e.target.src = `/default_poster.png`
              }}
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
            {info?.name ? (
              info.name
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
            {info?.description ? (
              removeHtmlAndMarkdown(info?.description)
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
              {moreInfo?.status ? (
                moreInfo.status
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
              {moreInfo?.duration ? (
                moreInfo.duration
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
              {moreInfo?.aired ? (
                moreInfo.aired
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
              {moreInfo?.studios ? (
                moreInfo.studios
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
              {moreInfo?.premiered ? (
                moreInfo.premiered
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
              {moreInfo?.malscore ? (
                moreInfo.malscore
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
              {info?.name && (
                <span className={styles.blob} style={{ flex: "0 0 auto" }}>
                  Synonyms :
                </span>
              )}
              {info?.name ? (
                <span style={{ flex: "1 1 auto", wordBreak: "break-word" }}>
                  {moreInfo?.synonyms}
                </span>
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
              {info?.name && <span className={styles.blob}>Producers :</span>}
              {moreInfo?.producers?.length > 0 && moreInfo.producers.join(", ")}
            </p>
            <p className={styles.sprtr}>
              <span className={styles.blob}>Genres :</span>
              {moreInfo?.genres ? (
                moreInfo.genres.join(", ")
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
