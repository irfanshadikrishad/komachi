import styles from "@/styles/search.module.css"
import { Dispatch, SetStateAction } from "react"
import { HiFilter } from "react-icons/hi"

export default function Filter({
  getSearched,
  setIsCountryOpen,
  setIsYearOpen,
  setIsGenreOpen,
  setIsSeasonOpen,
  setIsFormatOpen,
  setIsStatusOpen,
}: {
  getSearched: any
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>
  setIsYearOpen: Dispatch<SetStateAction<boolean>>
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <button
      className={styles.submit_btn}
      onClick={() => {
        getSearched()
        setIsYearOpen(false)
        setIsGenreOpen(false)
        setIsSeasonOpen(false)
        setIsFormatOpen(false)
        setIsCountryOpen(false)
        setIsStatusOpen(false)
      }}>
      <HiFilter />
      Filter
    </button>
  )
}
