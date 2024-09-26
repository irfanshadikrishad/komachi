import styles from "@/styles/search.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PiCheckCircleFill } from "react-icons/pi";
import { IoChevronDownOutline } from "react-icons/io5";

export default function Country({
  country,
  setCountry,
  insertValuesIntoState,
  isCountryOpen,
  setIsCountryOpen,
  setIsYearOpen,
  setIsGenreOpen,
  setIsSeasonOpen,
  setIsFormatOpen,
  setIsStatusOpen,
}: {
  country: string[];
  setCountry: Dispatch<SetStateAction<string[]>>;
  insertValuesIntoState: any;
  isCountryOpen: boolean;
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>;
  setIsYearOpen: Dispatch<SetStateAction<boolean>>;
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>;
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>;
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>;
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [distinctCountry, setDistinctCountry] = useState<string[]>([]);

  const getDistinctCountry = async () => {
    const request = await fetch(`/api/distinct/country`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await request.json();

    if (request.status === 200) {
      setDistinctCountry(response);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getDistinctCountry();
  }, []);
  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsCountryOpen(!isCountryOpen);
          setIsGenreOpen(false);
          setIsYearOpen(false);
          setIsSeasonOpen(false);
          setIsFormatOpen(false);
          setIsStatusOpen(false);
        }}
      >
        <p className={`one_line ${styles.values}`}>
          {country.length > 0 ? country.join(", ") : "Country"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isCountryOpen && (
        <div className={styles.filter_options}>
          {distinctCountry.length > 0 &&
            distinctCountry.map((disC, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    insertValuesIntoState(disC, setCountry);
                  }}
                >
                  <p>{disC}</p>
                  {country.includes(disC) && <PiCheckCircleFill />}
                </button>
              );
            })}
        </div>
      )}
    </section>
  );
}
