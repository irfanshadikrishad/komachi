import { FaCheckCircle } from "react-icons/fa";
import { insert_Into_Array } from "../utils/workers";

export default function FormatButton({ name, format, setFormat }) {
  return (
    <button
      className="format_btn"
      onClick={() => {
        insert_Into_Array(name, setFormat);
      }}
    >
      {name}
      {format.includes(name) && <FaCheckCircle />}
    </button>
  );
}
