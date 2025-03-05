import styles from "@/styles/search.module.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IoChevronDownOutline } from "react-icons/io5"
import { PiCheckCircleFill } from "react-icons/pi"

export default function Status({
  status,
  setStatus,
  isStatusOpen,
  insertValuesIntoState,
  setIsCountryOpen,
  setIsFormatOpen,
  setIsStatusOpen,
  setIsGenreOpen,
  setIsYearOpen,
  setIsSeasonOpen,
}: {
  status: string[]
  setStatus: Dispatch<SetStateAction<string[]>>
  isStatusOpen: boolean
  insertValuesIntoState: any
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>
  setIsYearOpen: Dispatch<SetStateAction<boolean>>
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [distinctStatus, setDistinctStatus] = useState<string[]>([
    "finished-airing",
    "currently-airing",
  ])

  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsStatusOpen(!isStatusOpen)
          setIsGenreOpen(false)
          setIsYearOpen(false)
          setIsSeasonOpen(false)
          setIsFormatOpen(false)
          setIsCountryOpen(false)
        }}>
        <p className={`one_line ${styles.values}`}>
          {status.length > 0 ? status.join(", ") : "Status"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isStatusOpen && (
        <div className={styles.filter_options}>
          {distinctStatus.length > 0 &&
            distinctStatus.map((disStat, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    insertValuesIntoState(disStat, setStatus)
                  }}>
                  <p>{disStat}</p>
                  {status.includes(disStat) && <PiCheckCircleFill />}
                </button>
              )
            })}
        </div>
      )}
    </section>
  )
}
