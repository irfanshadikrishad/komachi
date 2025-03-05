"use client"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import cardio from "@/styles/cardio.module.css"
import footer_styles from "@/styles/footer.module.css"
import styles from "@/styles/lists.module.css"
import { getTitle } from "@/utils/helpers"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function ListsComponent() {
  const [results, setResults] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [show, setShow] = useState<string | null>("")
  const searchParams = useSearchParams()

  const getShowResults = async (
    show: string,
    page: number = 1,
    perPage: number = 27
  ) => {
    setResults([])
    const request = await fetch(`/api/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show: show || "all", page, perPage }),
    })
    const response = await request.json()

    if (request.status === 200) {
      setResults(response.results)
      setCurrentPage(response.currentPage)
      setTotalCount(response.totalCount)
      setTotalPages(response.totalPages)
      setShow(show)
    } else {
      console.log("Error fetching results:", response)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure it runs on the client-side
      const showParam = searchParams.get("show") || "all"
      setShow(showParam)
      getShowResults(showParam)
    }
  }, [searchParams])

  return (
    <>
      <Navbar />
      <section className="container">
        <section className={styles.listsHeader}>
          <section className={footer_styles.list_Links}>
            {Array.from("0-9ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((char) => (
              <button
                key={char}
                style={{
                  color: show === char ? "var(--primary)" : "var(--color)",
                }}
                onClick={() => {
                  setShow(char)
                  getShowResults(char)
                }}>
                {char}
              </button>
            ))}
          </section>
          <div className={styles.pageBtns}>
            <button
              className={`${currentPage > 1 ? "primary" : ""}`}
              onClick={() =>
                currentPage > 1 && getShowResults(String(show), currentPage - 1)
              }>
              <FaChevronLeft />
            </button>
            <button
              className={`${currentPage < totalPages ? "primary" : ""}`}
              onClick={() =>
                currentPage < totalPages &&
                getShowResults(String(show), currentPage + 1)
              }>
              <FaChevronRight />
            </button>
          </div>
        </section>
        <section className={cardio.cardsContainer}>
          {results.length > 0
            ? results.map((item, idx) => (
                <Card
                  key={idx}
                  title={getTitle(item.title)}
                  id={item.anilistId}
                  image={item.poster}
                  subCount={item.sub_episodes.length}
                  dubCount={item.dub_episodes.length}
                  totalCount={item.totalEpisodes}
                  isAdult={item.isAdult}
                />
              ))
            : Array.from({ length: 20 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={273}
                  baseColor="var(--secondary)"
                  highlightColor="var(--background)"
                />
              ))}
        </section>
      </section>
      <Footer />
    </>
  )
}
