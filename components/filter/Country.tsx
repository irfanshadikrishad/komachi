import styles from "@/styles/search.module.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IoChevronDownOutline } from "react-icons/io5"
import { PiCheckCircleFill } from "react-icons/pi"

/**
 * No using as language filter
 * @param param0
 * @returns
 */
export default function Country({
  country,
  setCountry,
  insertValuesIntoState,
  isCountryOpen,
  setIsCountryOpen,
  setIsYearOpen,
  setIsGenreOpen,
  setIsSeasonOpen,
  setIsFormatOpen,
  setIsStatusOpen,
}: {
  country: string[]
  setCountry: Dispatch<SetStateAction<string[]>>
  insertValuesIntoState: any
  isCountryOpen: boolean
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>
  setIsYearOpen: Dispatch<SetStateAction<boolean>>
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [distinctCountry, setDistinctCountry] = useState<string[]>([
    "sub",
    "dub",
    "sub-&-dub",
  ])

  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsCountryOpen(!isCountryOpen)
          setIsGenreOpen(false)
          setIsYearOpen(false)
          setIsSeasonOpen(false)
          setIsFormatOpen(false)
          setIsStatusOpen(false)
        }}>
        <p className={`one_line ${styles.values}`}>
          {country.length > 0 ? country.join(", ") : "Language"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isCountryOpen && (
        <div className={styles.filter_options}>
          {distinctCountry.length > 0 &&
            distinctCountry.map((disC, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    insertValuesIntoState(disC, setCountry)
                  }}>
                  <p>{disC}</p>
                  {country.includes(disC) && <PiCheckCircleFill />}
                </button>
              )
            })}
        </div>
      )}
    </section>
  )
}
