import uniqolor from "uniqolor";
import { removeHtmlAndMarkdown } from "@/utils/helpers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Info({ animeInfo }) {
  return (
    <section className="streamingV2_Info">
      <section className="s768seperator">
        <div className="streamingV2_PosterContainer">
          {animeInfo?.poster ? (
            <img
              className="streamingV2_Poster"
              src={animeInfo?.poster}
              alt={String(animeInfo?.anilistId)}
              draggable="false"
            />
          ) : (
            <Skeleton
              baseColor="var(--background)"
              highlightColor="var(--secondary)"
              height={350}
            />
          )}
          {animeInfo?.isAdult === "true" && <p className="isAdult">18+</p>}
        </div>
        <section>
          <h1 className="streaming_title">
            {animeInfo?.title ? (
              animeInfo?.title?.english ? (
                animeInfo?.title.english
              ) : (
                animeInfo?.title.romaji
              )
            ) : (
              <Skeleton
                baseColor="var(--background)"
                highlightColor="var(--secondary)"
                height={25}
                width={200}
              />
            )}
          </h1>
          <p className="streamingV2_description">
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
          <section>
            <p className="seperator">
              <span className="blob">Status :</span>{" "}
              {animeInfo?.status ? (
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
            <p className="seperator">
              <span className="blob">Total Episodes :</span>{" "}
              {animeInfo?.sub_episodes.length > 0 ? (
                animeInfo?.sub_episodes.length > 0 ? (
                  animeInfo?.sub_episodes.length
                ) : (
                  animeInfo?.dub_episodes.length
                )
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            {animeInfo?.release_date && (
              <p className="seperator">
                <span className="blob">Released:</span>
                {animeInfo?.season ? (
                  `${animeInfo?.release_date} ${animeInfo?.season}`
                ) : (
                  <Skeleton
                    baseColor="var(--background)"
                    highlightColor="var(--secondary)"
                    width={90}
                    height={16}
                  />
                )}
              </p>
            )}
            <p className="seperator">
              <span className="blob">Type :</span>{" "}
              {animeInfo?.format ? (
                animeInfo?.format
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            {animeInfo?.airing_start && (
              <p className="seperator">
                <span className="blob">Airing Date :</span>
                {animeInfo?.airing_start ? (
                  ` ${Object.values(animeInfo?.airing_start).join("/")} ${
                    animeInfo?.airing_end.year
                      ? "– " + Object.values(animeInfo?.airing_end).join("/")
                      : ""
                  }`
                ) : (
                  <Skeleton
                    baseColor="var(--background)"
                    highlightColor="var(--secondary)"
                    width={90}
                    height={16}
                  />
                )}
              </p>
            )}
            <p className="seperator">
              <span className="blob">Studios:</span>{" "}
              {animeInfo?.studios ? (
                animeInfo?.studios.join(" • ")
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className="seperator">
              <span className="blob">Origin:</span>{" "}
              {animeInfo?.origin ? (
                animeInfo?.origin
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            <p className="seperator">
              <span className="blob">Synonyms:</span>{" "}
              {animeInfo?.synonyms ? (
                animeInfo?.synonyms.join(" • ")
              ) : (
                <Skeleton
                  baseColor="var(--background)"
                  highlightColor="var(--secondary)"
                  width={90}
                  height={16}
                />
              )}
            </p>
            {animeInfo?.genres ? (
              <div className="streamingV2InfoGenres">
                {animeInfo?.genres.map((genre, index) => {
                  const { color } = uniqolor(genre);
                  return (
                    <span key={index} style={{ color: color }}>
                      {genre}
                    </span>
                  );
                })}
              </div>
            ) : (
              <Skeleton
                baseColor="var(--background)"
                highlightColor="var(--secondary)"
                width={90}
                height={16}
              />
            )}
          </section>
        </section>
      </section>
    </section>
  );
}
