export default function Info({ animeInfo }) {
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
            <p>Status : {animeInfo.otherName.replace("Status:", " ")}</p>
            <p>Total Episodes : {animeInfo.totalEpisodes}</p>
            {animeInfo.releaseDate && (
              <p>
                Released: {animeInfo.releaseDate} {animeInfo.season}
              </p>
            )}
            <p>Type : {animeInfo.type}</p>
            {animeInfo.startDate && (
              <p>
                Airing Date : {animeInfo.startDate.day}/
                {animeInfo.startDate.month}/{animeInfo.startDate.year} –{" "}
                {animeInfo.endDate.day}/{animeInfo.endDate.month}/
                {animeInfo.endDate.year}{" "}
              </p>
            )}
            <div className="streamingV2InfoGenres">
              {animeInfo.genres &&
                animeInfo.genres.map((genre, index) => {
                  return <span key={index}>{genre}</span>;
                })}
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
