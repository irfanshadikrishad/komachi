import randomcolor from "random-color";

export default function NativeInfo({ styles, animeInfo }) {
  return (
    <section className={styles.info}>
      <img className={styles.poster} src={animeInfo.poster} draggable="false" />
      <div>
        <p className={styles.title}>{animeInfo.title}</p>
        <p className={styles.description}>{animeInfo.description}</p>
        <p className={styles.seperator}>
          <span className={styles.blob}>Released:</span> {animeInfo.released}
        </p>
        <p className={styles.seperator}>
          <span className={styles.blob}>Type:</span> {animeInfo.type}
        </p>
        <div className={styles.genres}>
          {animeInfo.genre &&
            animeInfo.genre.map((genre, index) => {
              const color = randomcolor(); // to get different color on every render
              return (
                <p
                  className={styles.genre}
                  key={index}
                  style={{ color: color.hexString() }}
                >
                  {genre}
                </p>
              );
            })}
        </div>
      </div>
    </section>
  );
}
