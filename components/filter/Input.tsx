import { Dispatch, SetStateAction } from "react";
import styles from "@/styles/search.module.css";
import { RiSearchLine } from "react-icons/ri";

export default function Input({
  query,
  setQuery,
  getSearched,
}: {
  query: null | string;
  setQuery: Dispatch<SetStateAction<string | null>>;
  getSearched: any;
}) {
  return (
    <section className={styles.filter_indi}>
      <div className={styles.searchFieldContainer}>
        <RiSearchLine />
        <input
          value={query ? query : ""}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className={styles.searchField}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              getSearched();
            }
          }}
        />
      </div>
    </section>
  );
}
