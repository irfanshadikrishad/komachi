import { FaCheckCircle } from "react-icons/fa";
import { insert_Into_Array } from "../utils/workers";

export default function GenreButton({ genres, genre, setGenres }) {
  return (
    <button
      className="genre_btn"
      onClick={() => {
        insert_Into_Array(genre, setGenres);
      }}
      style={{ color: genres.includes(genre) && "var(--primary)" }}
    >
      {genre}
      {genres.includes(genre) && <FaCheckCircle />}
    </button>
  );
}
