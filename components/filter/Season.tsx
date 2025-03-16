import styles from "@/styles/search.module.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IoChevronDownOutline } from "react-icons/io5"
import { PiCheckCircleFill } from "react-icons/pi"

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
  season: string[]
  setSeason: Dispatch<SetStateAction<string[]>>
  isSeasonOpen: boolean
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>
  setIsYearOpen: Dispatch<SetStateAction<boolean>>
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>
  insertValuesIntoState: any
}) {
  const [distinctSeason, setDistinctSeason] = useState<string[]>([
    "FALL",
    "WINTER",
    "SPRING",
    "SUMMER",
  ])

  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsSeasonOpen(!isSeasonOpen)
          setIsGenreOpen(false)
          setIsYearOpen(false)
          setIsFormatOpen(false)
          setIsCountryOpen(false)
          setIsStatusOpen(false)
        }}>
        <p className={`one_line ${styles.values}`}>
          {season.length > 0 ? season.join(", ") : "Season"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isSeasonOpen && (
        <div className={styles.filter_options}>
          {distinctSeason.length > 0 &&
            distinctSeason.map((disS, index) => {
              if (disS !== null) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      insertValuesIntoState(disS, setSeason)
                    }}>
                    <p>{String(disS)}</p>
                    {season.includes(disS) && <PiCheckCircleFill />}
                  </button>
                )
              }
            })}
        </div>
      )}
    </section>
  )
}
