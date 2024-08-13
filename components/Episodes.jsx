import styles from "@/styles/player.module.css";
import { useEffect, useState } from "react";
// Icons
import { LuSearch } from "react-icons/lu";
import {
  IoChevronDownOutline,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";

export default function Episodes({
  unicornEpisodes,
  getStreamLink,
  animeId,
  malId,
  currentEpisode,
}) {
  const [goodEpisodes, setGoodEpisodes] = useState([]);
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [selectedEpisodeRange, setSelectedEpisodeRange] = useState(0);
  const start = selectedEpisodeRange * 100 + 1;
  const end = (selectedEpisodeRange + 1) * 100;

  useEffect(() => {
    // CHUNK UP ARRAY
    if (unicornEpisodes) {
      const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
          const chunk = array.slice(i, i + size);
          result.push(chunk);
        }
        return result;
      };

      const chunks = chunkArray(unicornEpisodes, 100);
      setGoodEpisodes(chunks);
    }
  }, [unicornEpisodes]);
  return (
    <>
      <section className={styles.range_Main}>
        <div className={styles.search}>
          <LuSearch /> <input type="text" placeholder="Search" />
        </div>
        <div className={styles.limit_Main}>
          <div style={{ position: "relative" }}>
            <div
              className={styles.range_limit}
              onClick={() => {
                setIsRangeOpen(!isRangeOpen);
              }}
            >
              1-100 <IoChevronDownOutline />
            </div>
            {isRangeOpen && (
              <div className={styles.limit_details}>
                {goodEpisodes.map((_, index) => {
                  const start = index * 100 + 1;
                  const end = (index + 1) * 100;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedEpisodeRange(index);
                        setIsRangeOpen(false);
                      }}
                    >
                      {`${start}-${end}`}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <button>
            <IoChevronBack />
          </button>
          <button>
            <IoChevronForward />
          </button>
        </div>
      </section>
      <div className={styles.streamingV2Buttons}>
        {goodEpisodes &&
          goodEpisodes[selectedEpisodeRange]?.map(
            ({ id, title, number }, index) => {
              return (
                <button
                  onClick={() => {
                    getStreamLink(id);
                    // localStorage.setItem(animeId, id);
                  }}
                  key={index}
                  className={styles.streamingV2Button}
                  style={{
                    backgroundColor: currentEpisode === id && "var(--primary)",
                  }}
                >
                  {number}
                </button>
              );
            }
          )}
      </div>
    </>
  );
}
