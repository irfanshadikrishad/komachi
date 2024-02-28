export default function NativeInfo({ styles, animeInfo }) {
  return (
    <section className={styles.info}>
      <img className={styles.poster} src={animeInfo.poster} draggable="false" />
      <div>
        <p>{animeInfo.title}</p>
        <p className={styles.description}>{animeInfo.description}</p>
        <p>Released: {animeInfo.released}</p>
        <p>Type: {animeInfo.type}</p>
        <div className={styles.genres}>
          {animeInfo.genre &&
            animeInfo.genre.map((genre, index) => {
              return (
                <p className={styles.genre} key={index}>
                  {genre}
                </p>
              );
            })}
        </div>
      </div>
    </section>
  );
}
