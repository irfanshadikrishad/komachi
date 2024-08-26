import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [distinctFormat, setDistinctFormat] = useState<string[]>([]);

  const getDistinctFormat = async () => {
    const request = await fetch(`/api/distinct/format`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await request.json();

    if (request.status === 200) {
      setDistinctFormat(response);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    getDistinctFormat();
  }, []);
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
          {distinctFormat.length > 0 &&
            distinctFormat.map((disF, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    insertValuesIntoState(disF, setFormat);
                  }}
                >
                  <p>{disF}</p>
                  {format.includes(disF) && <PiCheckCircleFill />}
                </button>
              );
            })}
        </div>
      )}
    </section>
  );
}
