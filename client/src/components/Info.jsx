import { memo } from "react";
import uniqolor from "uniqolor";
import { removeHtmlAndMarkdown } from "../utils/info_modifier";

const Info = memo(({ animeInfo }) => {
  return (
    <section className="streamingV2_Info">
      <section className="s768seperator">
        <div className="streamingV2_PosterContainer">
          <img
            className="streamingV2_Poster"
            src={animeInfo.image}
            alt={animeInfo.id}
            draggable="false"
          />
        </div>
        <section>
          <h1 className="streaming_title">
            {animeInfo.title.english
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
              {animeInfo.totalEpisodes}
            </p>
            {animeInfo.releaseDate && (
              <p className="seperator">
                <span className="blob">Released:</span> {animeInfo.releaseDate}{" "}
                {animeInfo.season}
              </p>
            )}
            <p className="seperator">
              <span className="blob">Type :</span> {animeInfo.type}
            </p>
            {animeInfo.startDate && (
              <p className="seperator">
                <span className="blob">Airing Date :</span>
                {` ${Object.values(animeInfo.startDate).join("/")} ${
                  animeInfo.endDate.year
                    ? "– " + Object.values(animeInfo.endDate).join("/")
                    : ""
                }`}
              </p>
            )}
            <p className="seperator">
              <span className="blob">Studios:</span>{" "}
              {animeInfo.studios && animeInfo.studios.join(" • ")}
            </p>
            <p className="seperator">
              <span className="blob">Synonyms:</span>{" "}
              {animeInfo.synonyms && animeInfo.synonyms.join(" • ")}
            </p>
            <div className="streamingV2InfoGenres">
              {animeInfo.genres &&
                animeInfo.genres.map((genre, index) => {
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

export default Info;
