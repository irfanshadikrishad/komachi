import { useEffect, useRef, useState } from "react";
import styles from "@/styles/player.module.css";
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
}: {
  unicornEpisodes: any[];
  getStreamLink: any;
  animeId: string;
  malId: string;
  currentEpisode: number | string;
}) {
  const [goodEpisodes, setGoodEpisodes] = useState<any[]>([]);
  const [isRangeOpen, setIsRangeOpen] = useState<boolean>(false);
  const [selectedEpisodeRange, setSelectedEpisodeRange] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const start = selectedEpisodeRange * 100 + 1;
  const end = (selectedEpisodeRange + 1) * 100;

  useEffect(() => {
    // CHUNK UP ARRAY
    if (unicornEpisodes) {
      const chunkArray = (array: any[], size: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
          const chunk = array.slice(i, i + size);
          result.push(chunk);
        }
        return result;
      };

      const chunks: any[] = chunkArray(unicornEpisodes, 100);
      setGoodEpisodes(chunks);
    }
  }, [unicornEpisodes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(event.target as Node)
      ) {
        setIsRangeOpen(false);
      }
    };

    if (isRangeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRangeOpen]);

  return (
    <>
      <section className={styles.range_Main}>
        <div className={styles.search}>
          <LuSearch /> <input type="text" placeholder="Search" />
        </div>
        <div className={styles.limit_Main}>
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <div
              className={styles.range_limit}
              onClick={() => {
                setIsRangeOpen(!isRangeOpen);
              }}
            >
              {`${start}-${end}`} <IoChevronDownOutline />
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
            (
              {
                id,
                title,
                number,
              }: {
                id: string;
                title: { english: string; romaji: string };
                number: number;
              },
              index: number
            ) => {
              return (
                <button
                  onClick={() => {
                    getStreamLink(id);
                    // localStorage.setItem(animeId, id);
                  }}
                  key={index}
                  className={styles.streamingV2Button}
                  style={{
                    backgroundColor:
                      currentEpisode === id
                        ? "var(--primary)"
                        : "var(--background)",
                    color:
                      currentEpisode === id
                        ? "var(--background)"
                        : "var(--color)",
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
