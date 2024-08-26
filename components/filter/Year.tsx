import { Dispatch, SetStateAction } from "react";
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
          {year.length > 0 ? year.join(", ") : "Year"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isYearOpen && (
        <div className={`${styles.filter_options} ${styles.filter_optionYear}`}>
          <button
            onClick={() => {
              insertValuesIntoState("2024", setYear);
            }}
          >
            <p>2024</p>
            {year.includes("2024") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2023", setYear);
            }}
          >
            <p>2023</p>
            {year.includes("2023") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2022", setYear);
            }}
          >
            <p>2022</p>
            {year.includes("2022") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2021", setYear);
            }}
          >
            <p>2021</p>
            {year.includes("2021") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2020", setYear);
            }}
          >
            <p>2020</p>
            {year.includes("2020") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2019", setYear);
            }}
          >
            <p>2019</p>
            {year.includes("2019") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2018", setYear);
            }}
          >
            <p>2018</p>
            {year.includes("2018") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2017", setYear);
            }}
          >
            <p>2017</p>
            {year.includes("2017") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2016", setYear);
            }}
          >
            <p>2016</p>
            {year.includes("2016") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2015", setYear);
            }}
          >
            <p>2015</p>
            {year.includes("2015") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2014", setYear);
            }}
          >
            <p>2014</p>
            {year.includes("2014") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2013", setYear);
            }}
          >
            <p>2013</p>
            {year.includes("2013") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2012", setYear);
            }}
          >
            <p>2012</p>
            {year.includes("2012") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2011", setYear);
            }}
          >
            <p>2011</p>
            {year.includes("2011") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2010", setYear);
            }}
          >
            <p>2010</p>
            {year.includes("2010") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2009", setYear);
            }}
          >
            <p>2009</p>
            {year.includes("2009") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2008", setYear);
            }}
          >
            <p>2008</p>
            {year.includes("2008") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2007", setYear);
            }}
          >
            <p>2007</p>
            {year.includes("2007") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2006", setYear);
            }}
          >
            <p>2006</p>
            {year.includes("2006") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2005", setYear);
            }}
          >
            <p>2005</p>
            {year.includes("2005") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2004", setYear);
            }}
          >
            <p>2004</p>
            {year.includes("2004") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2003", setYear);
            }}
          >
            <p>2003</p>
            {year.includes("2003") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2002", setYear);
            }}
          >
            <p>2002</p>
            {year.includes("2002") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("2001", setYear);
            }}
          >
            <p>2001</p>
            {year.includes("2001") && <PiCheckCircleFill />}
          </button>
        </div>
      )}
    </section>
  );
}
