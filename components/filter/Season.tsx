import { Dispatch, SetStateAction } from "react";
import styles from "@/styles/search.module.css";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";

export default function Season({
  season,
  setSeason,
  isSeasonOpen,
  setIsSeasonOpen,
  setIsGenreOpen,
  setIsYearOpen,
  setIsFormatOpen,
  setIsCountryOpen,
  setIsStatusOpen,
  insertValuesIntoState,
}: {
  season: string[];
  setSeason: Dispatch<SetStateAction<string[]>>;
  isSeasonOpen: boolean;
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>;
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>;
  setIsYearOpen: Dispatch<SetStateAction<boolean>>;
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>;
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>;
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>;
  insertValuesIntoState: any;
}) {
  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsSeasonOpen(!isSeasonOpen);
          setIsGenreOpen(false);
          setIsYearOpen(false);
          setIsFormatOpen(false);
          setIsCountryOpen(false);
          setIsStatusOpen(false);
        }}
      >
        <p className={`one_line ${styles.values}`}>
          {season.length > 0 ? season.join(", ") : "Season"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isSeasonOpen && (
        <div className={styles.filter_options}>
          <button
            onClick={() => {
              insertValuesIntoState("SUMMER", setSeason);
            }}
          >
            <p>Summer</p>
            {season.includes("SUMMER") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("WINTER", setSeason);
            }}
          >
            <p>Winter</p>
            {season.includes("WINTER") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("FALL", setSeason);
            }}
          >
            <p>Fall</p>
            {season.includes("FALL") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("SPRING", setSeason);
            }}
          >
            <p>Spring</p>
            {season.includes("SPRING") && <PiCheckCircleFill />}
          </button>
        </div>
      )}
    </section>
  );
}
