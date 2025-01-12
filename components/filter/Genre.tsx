import styles from "@/styles/search.module.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IoChevronDownOutline } from "react-icons/io5"
import { PiCheckCircleFill } from "react-icons/pi"

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
  genre: string[]
  setGenre: Dispatch<SetStateAction<string[]>>
  isGenreOpen: boolean
  insertValuesIntoState: any
  setIsGenreOpen: Dispatch<SetStateAction<boolean>>
  setIsYearOpen: Dispatch<SetStateAction<boolean>>
  setIsSeasonOpen: Dispatch<SetStateAction<boolean>>
  setIsFormatOpen: Dispatch<SetStateAction<boolean>>
  setIsCountryOpen: Dispatch<SetStateAction<boolean>>
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [distinctGenres, setDistinctGenres] = useState<string[]>([])

  const getDistinctGenres = async () => {
    const request = await fetch(`/api/home`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    const response = await request.json()

    if (request.status === 200) {
      setDistinctGenres(response.genres)
    } else {
      console.log(response)
      setDistinctGenres([])
    }
  }

  useEffect(() => {
    getDistinctGenres()
  }, [])
  return (
    <section className={styles.filter_indi}>
      <button
        className={styles.filter_btn}
        onClick={() => {
          setIsGenreOpen(!isGenreOpen)
          setIsYearOpen(false)
          setIsSeasonOpen(false)
          setIsFormatOpen(false)
          setIsCountryOpen(false)
          setIsStatusOpen(false)
        }}>
        <p className={`one_line ${styles.values}`}>
          {genre.length > 0 ? genre.join(", ") : "Genres"}
        </p>
        <IoChevronDownOutline />
      </button>
      {isGenreOpen && (
        <div className={`${styles.filter_options} ${styles.filter_divideTwo}`}>
          {distinctGenres.length > 0 &&
            distinctGenres.map((disG, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    insertValuesIntoState(disG, setGenre)
                  }}>
                  <p>{disG}</p>
                  {genre.includes(disG) && <PiCheckCircleFill />}
                </button>
              )
            })}
        </div>
      )}
    </section>
  )
}
