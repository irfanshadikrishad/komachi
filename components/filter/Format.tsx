import { Dispatch, SetStateAction } from "react";
import styles from "@/styles/search.module.css";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";

export default function Format({
  format,
  setFormat,
  isFormatOpen,
  setIsFormatOpen,
  setIsGenreOpen,
  setIsYearOpen,
  setIsSeasonOpen,
  setIsCountryOpen,
  setIsStatusOpen,
  insertValuesIntoState,
}: {
  format: string[];
  setFormat: Dispatch<SetStateAction<string[]>>;
  isFormatOpen: boolean;
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>;
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>;
  setIsYearOpen: Dispatch<SetStateAction<boolean>>;
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>;
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>;
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>;
  insertValuesIntoState: any;
}) {
  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsFormatOpen(!isFormatOpen);
          setIsGenreOpen(false);
          setIsYearOpen(false);
          setIsSeasonOpen(false);
          setIsCountryOpen(false);
          setIsStatusOpen(false);
        }}
      >
        <p className={`one_line ${styles.values}`}>
          {format.length > 0 ? format.join(", ") : "Format"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isFormatOpen && (
        <div className={styles.filter_options}>
          <button
            onClick={() => {
              insertValuesIntoState("TV", setFormat);
            }}
          >
            <p>TV</p>
            {format.includes("TV") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("TV_SHORT", setFormat);
            }}
          >
            <p>TV Short</p>
            {format.includes("TV_SHORT") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("MOVIE", setFormat);
            }}
          >
            <p>Movie</p>
            {format.includes("MOVIE") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("OVA", setFormat);
            }}
          >
            <p>OVA</p>
            {format.includes("OVA") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("ONA", setFormat);
            }}
          >
            <p>ONA</p>
            {format.includes("ONA") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("MUSIC", setFormat);
            }}
          >
            <p>Music</p>
            {format.includes("MUSIC") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("SPECIAL", setFormat);
            }}
          >
            <p>Special</p>
            {format.includes("SPECIAL") && <PiCheckCircleFill />}
          </button>
        </div>
      )}
    </section>
  );
}
