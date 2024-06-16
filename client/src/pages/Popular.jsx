import { useEffect, useState } from "react";
import styles from "../styles/search.module.css";
import { useAuth } from "../store/auth";
import Card from "../components/Card";

export default function Popular() {
  const { SERVER } = useAuth();
  const [popular, setPopular] = useState([]);

  const getPopular = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/popular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 27 }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setPopular(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);
  return (
    <section className="container">
      <section className={styles.billboard_Wrapper}>
        <section className={styles.billboard_Main}>
          <div className={styles.billboard_HeaderMain}>
            <p className={styles.billboard_Header}>popular</p>
          </div>
          <section className={styles.billboard}>
            {popular.map(({ id, image, totalEpisodes, title }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  image={image}
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
