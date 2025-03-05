"use client"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import cardio from "@/styles/cardio.module.css"
import styles from "@/styles/studios.module.css"
import { getTitle } from "@/utils/helpers"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
// Skeleton
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

type Anime = {
  _id: string
  title: {
    english?: string
    native?: string
    romaji?: string
    userPreffered?: string
  }
  genres: [string]
  poster: string
  sub_episodes: [{}]
  dub_episodes: [{}]
  totalEpisodes: number
  isAdult: string
  anilistId: string
}
type Pagination = {
  currentPage: number
  perPage: number
  totalPages: number
  totalItems: number
}

export default function Studio() {
  const { studio }: { studio: string } = useParams()
  const [studioAnimes, setStudioAnimes] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 20
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 0,
    perPage: 0,
    totalPages: 0,
    totalItems: 0,
  })

  async function getStudioAnimes(page: number) {
    try {
      setIsLoading(true) // Set loading to true
      setIsDataLoaded(false) // Reset data load state
      setStudioAnimes([]) // Clear the existing data
      const request = await fetch(`/api/studios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studio,
          page,
          perPage,
        }),
      })
      const response = await request.json()
      console.log(response)

      if (request.status === 200) {
        setStudioAnimes(response.data)
        setPagination(response.pagination)
      } else {
        console.error(response)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // Reset loading state
      setIsDataLoaded(true) // Mark data as loaded
    }
  }

  useEffect(() => {
    if (studio) getStudioAnimes(page)
  }, [studio, page])

  const handleNextPage = () => setPage((prev) => prev + 1)
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1))

  return (
    <>
      <Navbar />
      <section className="container">
        <div className={styles.header}>
          <div>
            <h1>{`${decodeURIComponent(studio)} (${pagination.totalItems}) [${pagination.currentPage}/${pagination.totalPages}]`}</h1>
          </div>
          <div className={styles.navigation}>
            <button
              style={{
                color:
                  pagination.currentPage === 1
                    ? "var(--color)"
                    : "var(--primary)",
              }}
              onClick={handlePreviousPage}
              disabled={page === 1}
              aria-label="Previous Page">
              <FaChevronLeft />
            </button>
            <button
              style={{
                color:
                  pagination.totalPages <= pagination.currentPage
                    ? "var(--color)"
                    : "var(--primary)",
              }}
              onClick={handleNextPage}
              aria-label="Next Page">
              <FaChevronRight />
            </button>
          </div>
        </div>
        <section className={cardio.cardsContainer}>
          {isLoading ? (
            Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                key={index}
                height={273}
                baseColor="var(--secondary)"
                highlightColor="var(--background)"
              />
            ))
          ) : isDataLoaded && studioAnimes.length === 0 ? (
            <p>No anime found.</p>
          ) : (
            studioAnimes.map((std: Anime, idx: number) => (
              <Card
                key={idx}
                id={std.anilistId}
                image={std.poster}
                title={getTitle(std.title)}
                subCount={std.sub_episodes.length}
                dubCount={std.dub_episodes.length}
                totalCount={std.totalEpisodes}
                isAdult={std.isAdult}
              />
            ))
          )}
        </section>
      </section>
      <Footer />
    </>
  )
}
