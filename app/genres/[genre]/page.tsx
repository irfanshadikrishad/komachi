"use client"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import cardio from "@/styles/cardio.module.css"
import studioStyle from "@/styles/studios.module.css"
import { getTitle } from "@/utils/helpers"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

type Pagination = {
  currentPage: number
  perPage: number
  totalPages: number
  totalItems: number
}

export default function Genre() {
  const { genre }: { genre: string } = useParams()
  const [genreAnimes, setGenreAnimes] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 0,
    perPage: 0,
    totalPages: 0,
    totalItems: 0,
  })

  async function getGenresAnimes() {
    setGenreAnimes([])
    try {
      const request = await fetch(`/api/genres`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre,
          page,
          perPage: 20,
        }),
      })
      const response = await request.json()
      console.log(response)
      if (request.status === 200) {
        setGenreAnimes(response.data)
        setPagination(response.pagination)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextPage = () => setPage((prev) => prev + 1)
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1))

  useEffect(() => {
    if (genre) getGenresAnimes()
  }, [genre, page])
  return (
    <>
      <Navbar />
      <section className="container">
        <div className={studioStyle.header}>
          <div>
            <h1>{`${decodeURIComponent(genre)} (${pagination.totalItems}) [${pagination.currentPage}/${pagination.totalPages}]`}</h1>
          </div>
          <div className={studioStyle.navigation}>
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
          {genreAnimes.length > 0
            ? genreAnimes.map(
                (
                  {
                    anilistId,
                    poster,
                    title,
                    sub_episodes,
                    dub_episodes,
                    totalEpisodes,
                    isAdult,
                  }: {
                    anilistId: string
                    poster: string
                    title: {
                      english?: string
                      romaji?: string
                      native?: string
                    }
                    sub_episodes: [{}]
                    dub_episodes: [{}]
                    totalEpisodes: number
                    isAdult: string
                  },
                  idx: number
                ) => {
                  return (
                    <Card
                      key={idx}
                      id={anilistId}
                      image={poster}
                      title={getTitle(title)}
                      subCount={sub_episodes.length}
                      dubCount={dub_episodes.length}
                      totalCount={totalEpisodes}
                      isAdult={isAdult}
                    />
                  )
                }
              )
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
