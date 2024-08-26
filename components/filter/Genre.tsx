import { Dispatch, SetStateAction } from "react";
import styles from "@/styles/search.module.css";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";

export default function Genre({
  genre,
  setGenre,
  isGenreOpen,
  insertValuesIntoState,
  setIsGenreOpen,
  setIsYearOpen,
  setIsSeasonOpen,
  setIsFormatOpen,
  setIsCountryOpen,
  setIsStatusOpen,
}: {
  genre: string[];
  setGenre: Dispatch<SetStateAction<string[]>>;
  isGenreOpen: boolean;
  insertValuesIntoState: any;
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>;
  setIsYearOpen: Dispatch<SetStateAction<boolean>>;
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>;
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>;
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>;
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsGenreOpen(!isGenreOpen);
          setIsYearOpen(false);
          setIsSeasonOpen(false);
          setIsFormatOpen(false);
          setIsCountryOpen(false);
          setIsStatusOpen(false);
        }}
      >
        <p className={`one_line ${styles.values}`}>
          {genre.length > 0 ? genre.join(", ") : "Genres"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isGenreOpen && (
        <div className={styles.filter_options}>
          <button
            onClick={() => {
              insertValuesIntoState("Action", setGenre);
            }}
          >
            <p>Action</p>
            {genre.includes("Action") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Adventure", setGenre);
            }}
          >
            <p>Adventure</p>
            {genre.includes("Adventure") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Comedy", setGenre);
            }}
          >
            <p>Comedy</p>
            {genre.includes("Comedy") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Drama", setGenre);
            }}
          >
            <p>Drama</p>
            {genre.includes("Drama") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Ecchi", setGenre);
            }}
          >
            <p>Ecchi</p>
            {genre.includes("Ecchi") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Fantasy", setGenre);
            }}
          >
            <p>Fantasy</p>
            {genre.includes("Fantasy") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Hentai", setGenre);
            }}
          >
            <p>Hentai</p>
            {genre.includes("Hentai") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Horror", setGenre);
            }}
          >
            <p>Horror</p>
            {genre.includes("Horror") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Mahou Shoujo", setGenre);
            }}
          >
            <p>Mahou Shoujo</p>
            {genre.includes("Mahou Shoujo") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Mecha", setGenre);
            }}
          >
            <p>Mecha</p>
            {genre.includes("Mecha") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Music", setGenre);
            }}
          >
            <p>Music</p>
            {genre.includes("Music") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Mystery", setGenre);
            }}
          >
            <p>Mystery</p>
            {genre.includes("Mystery") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Overpowered", setGenre);
            }}
          >
            <p>Overpowered</p>
            {genre.includes("Overpowered") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Psychological", setGenre);
            }}
          >
            <p>Psychological</p>
            {genre.includes("Psychological") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Romance", setGenre);
            }}
          >
            <p>Romance</p>
            {genre.includes("Romance") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Sci-Fi", setGenre);
            }}
          >
            <p>Sci-Fi</p>
            {genre.includes("Sci-Fi") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Slice of Life", setGenre);
            }}
          >
            <p>Slice of Life</p>
            {genre.includes("Slice of Life") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Sports", setGenre);
            }}
          >
            <p>Sports</p>
            {genre.includes("Sports") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Supernatural", setGenre);
            }}
          >
            <p>Supernatural</p>
            {genre.includes("Supernatural") && <PiCheckCircleFill />}
          </button>
          <button
            onClick={() => {
              insertValuesIntoState("Thriller", setGenre);
            }}
          >
            <p>Thriller</p>
            {genre.includes("Thriller") && <PiCheckCircleFill />}
          </button>
        </div>
      )}
    </section>
  );
}
