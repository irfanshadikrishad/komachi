import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import styles from "../styles/board.module.css";
import { Link } from "react-router-dom";
// ICONS
import { FaRegCirclePlay } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";
// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  allDevice: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
};

export default function Board() {
  const { SERVER } = useAuth();
  const [popular, setPopular] = useState([]);

  const getPopularAnime = async () => {
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/trending`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
    getPopularAnime();
  }, []);
  return (
    <section className="container">
      <Carousel
        autoPlay={true}
        infinite={true}
        showDots={true}
        keyBoardControl={true}
        swipeable={true}
        draggable={true}
        // removeArrowOnDeviceType={["allDevice"]}
        responsive={responsive}
      >
        {popular.map((pplr, index) => {
          return (
            <section key={index} style={{ position: "relative" }}>
              <div
                className={styles.board}
                style={{
                  backgroundImage: `url(${pplr.cover})`,
                }}
              ></div>
              <div className={styles.elem}>
                <h1 className={styles.title}>
                  {pplr.title && pplr.title.english
                    ? pplr.title.english
                    : pplr.title.romaji}
                </h1>
                <p className={styles.description}>
                  {String(pplr.description).length > 150
                    ? `${String(pplr.description).slice(0, 150)}...`
                    : String(pplr.description)}
                </p>
                <div className={styles.boardBtns}>
                  <Link href={`/streaming/${pplr.id}`} className={styles.watch}>
                    {<FaRegCirclePlay />} Watch now
                  </Link>
                  <button className={styles.bookmark}>
                    {<BsBookmarkStar />}
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </Carousel>
    </section>
  );
}
