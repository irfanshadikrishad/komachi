import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "@/styles/search.module.css";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";

export default function Year({
  year,
  setYear,
  isYearOpen,
  setIsYearOpen,
  setIsGenreOpen,
  setIsSeasonOpen,
  setIsFormatOpen,
  setIsCountryOpen,
  setIsStatusOpen,
  insertValuesIntoState,
}: {
  year: string[];
  setYear: Dispatch<SetStateAction<string[]>>;
  isYearOpen: boolean;
  setIsYearOpen: Dispatch<SetStateAction<boolean>>;
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>;
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>;
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>;
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>;
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>;
  insertValuesIntoState: any;
}) {
  const [distinctYear, setDistinctYear] = useState<string[]>([]);

  const getDistinctYear = async () => {
    const request = await fetch(`/api/distinct/year`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await request.json();

    if (request.status === 200) {
      setDistinctYear(response);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getDistinctYear();
  }, []);
  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsYearOpen(!isYearOpen);
          setIsGenreOpen(false);
          setIsSeasonOpen(false);
          setIsFormatOpen(false);
          setIsCountryOpen(false);
          setIsStatusOpen(false);
        }}
      >
        <p className={`one_line ${styles.values}`}>
          {year.length > 0 ? String(year.join(", ")) : "Year"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isYearOpen && (
        <div className={`${styles.filter_options} ${styles.filter_optionYear}`}>
          {distinctYear.length > 0 &&
            distinctYear.map((disY, index) => {
              if (disY !== null) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      insertValuesIntoState(disY, setYear);
                    }}
                  >
                    <p>{String(disY)}</p>
                    {year.includes(disY) && <PiCheckCircleFill />}
                  </button>
                );
              }
            })}
        </div>
      )}
    </section>
  );
}
