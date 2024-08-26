import styles from "@/styles/search.module.css";
import { Dispatch, SetStateAction } from "react";
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
          <button
            onClick={() => {
              insertValuesIntoState("JP", setCountry);
            }}
          >
            <p>Japan</p>
            {country.includes("JP") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("CN", setCountry);
            }}
          >
            <p>China</p>
            {country.includes("CN") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("KR", setCountry);
            }}
          >
            <p>Korea</p>
            {country.includes("KR") && <PiCheckCircleFill />}
          </button>
        </div>
      )}
    </section>
  );
}
