import { memo } from "react";
import uniqolor from "uniqolor";
import { removeHtmlAndMarkdown } from "@/utils/helpers";
import { AnimeInfo } from "@/utils/helpers";

interface InfoProps {
  animeInfo: AnimeInfo;
}

const Info: React.FC<InfoProps> = memo(({ animeInfo }) => {
  return (
    <section className="streamingV2_Info">
      <section className="s768seperator">
        <div className="streamingV2_PosterContainer">
          <img
            className="streamingV2_Poster"
            src={animeInfo.poster}
            alt={String(animeInfo.anilistId)}
            draggable="false"
          />
          {animeInfo.isAdult === "true" && <p className="isAdult">18+</p>}
        </div>
        <section>
          <h1 className="streaming_title">
            {animeInfo.title?.english
              ? animeInfo.title.english
              : animeInfo.title.romaji}
          </h1>
          <p className="streamingV2_description">
            {animeInfo.description &&
              removeHtmlAndMarkdown(animeInfo.description)}
          </p>
          <section>
            <p className="seperator">
              <span className="blob">Status :</span> {animeInfo.status}
            </p>
            <p className="seperator">
              <span className="blob">Total Episodes :</span>{" "}
              {animeInfo.sub_episodes.length > 0
                ? animeInfo.sub_episodes.length
                : animeInfo.dub_episodes.length}
            </p>
            {animeInfo?.release_date && (
              <p className="seperator">
                <span className="blob">Released:</span> {animeInfo.release_date}{" "}
                {animeInfo.season}
              </p>
            )}
            <p className="seperator">
              <span className="blob">Type :</span> {animeInfo.format}
            </p>
            {animeInfo.airing_start && (
              <p className="seperator">
                <span className="blob">Airing Date :</span>
                {` ${Object.values(animeInfo.airing_start).join("/")} ${
                  animeInfo.airing_end.year
                    ? "– " + Object.values(animeInfo.airing_end).join("/")
                    : ""
                }`}
              </p>
            )}
            <p className="seperator">
              <span className="blob">Studios:</span>{" "}
              {animeInfo.studios && animeInfo.studios.join(" • ")}
            </p>
            <p className="seperator">
              <span className="blob">Origin:</span>{" "}
              {animeInfo.origin && animeInfo.origin}
            </p>
            <p className="seperator">
              <span className="blob">Synonyms:</span>{" "}
              {animeInfo.synonyms && animeInfo.synonyms.join(" • ")}
            </p>
            <div className="streamingV2InfoGenres">
              {animeInfo.genres &&
                animeInfo.genres.map((genre: string, index: number) => {
                  const { color } = uniqolor(genre);
                  return (
                    <span key={index} style={{ color: color }}>
                      {genre}
                    </span>
                  );
                })}
            </div>
          </section>
        </section>
      </section>
    </section>
  );
});

Info.displayName = "Info";

export default Info;
