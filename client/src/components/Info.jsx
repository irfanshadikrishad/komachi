import { memo } from "react";
import randomcolor from "random-color";

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
          <p>{animeInfo.title && animeInfo.title}</p>
          <p className="streamingV2_description">{animeInfo.description}</p>
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
                <span className="blob">Airing Date :</span>{" "}
                {animeInfo.startDate.day}/{animeInfo.startDate.month}/
                {animeInfo.startDate.year} – {animeInfo.endDate.day}/
                {animeInfo.endDate.month}/{animeInfo.endDate.year}{" "}
              </p>
            )}
            <p>
              <span className="blob">Synonyms:</span> {animeInfo.otherName}
            </p>
            <div className="streamingV2InfoGenres">
              {animeInfo.genres &&
                animeInfo.genres.map((genre, index) => {
                  const color = randomcolor();
                  return (
                    <span key={index} style={{ color: color.hexString() }}>
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
