"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import styles from "@/styles/stats.module.css"
import { useEffect, useState } from "react"
// Skeleton
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Stats() {
  const [stats, setStats] = useState<{
    total_animes: string
    total_ongoing: string
  }>()

  const getStats = async () => {
    try {
      const request = await fetch(`/api/stats`, {
        method: "GET",
        cache: "default",
      })
      const response = await request.json()

      if (request.status === 200) {
        setStats(response)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStats()
  }, [])
  return (
    <>
      <Navbar />
      <section className="container">
        <section className={styles.stats_Cards}>
          <div
            className={styles.stats_Card}
            style={{ backgroundImage: "url(kanna.png)" }}>
            <p>Total Animes</p>
            {stats?.total_animes ? (
              <h1>{stats?.total_animes}</h1>
            ) : (
              <Skeleton
                width={100}
                height={20}
                highlightColor="var(--secondary)"
                baseColor="var(--background)"
              />
            )}
          </div>
          <div
            className={styles.stats_Card}
            style={{ backgroundImage: "url(gojo.png)" }}>
            <p>Total Ongoing</p>
            {stats?.total_ongoing ? (
              <h1>{stats?.total_ongoing}</h1>
            ) : (
              <Skeleton
                width={100}
                height={20}
                highlightColor="var(--secondary)"
                baseColor="var(--background)"
              />
            )}
          </div>
        </section>
      </section>
      <Footer />
    </>
  )
}
