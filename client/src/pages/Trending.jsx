import { useEffect, useState } from "react";
import styles from "../styles/search.module.css";
import { useAuth } from "../store/auth";
import Card from "../components/Card";

export default function Trending() {
  const { SERVER } = useAuth();
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/trending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 27 }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setTrending(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);
  return (
    <section className="container">
      <section className={styles.billboard_Wrapper}>
        <section className={styles.billboard_Main}>
          <div className={styles.billboard_HeaderMain}>
            <p className={styles.billboard_Header}>Trending</p>
          </div>
          <section className={styles.billboard}>
            {trending.map(({ anilistId, poster, totalEpisodes, title }) => {
              return (
                <Card
                  key={anilistId}
                  id={anilistId}
                  image={poster}
                  totalEpisodes={totalEpisodes}
                  title={title}
                />
              );
            })}
          </section>
        </section>
      </section>
    </section>
  );
}
