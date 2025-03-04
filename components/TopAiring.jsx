"use client"
import { useEffect, useState } from "react"
import cardio from "../styles/cardio.module.css"
import Card from "./Card"

export default function TopAiring() {
  const [topAiring, setTopiring] = useState([])

  async function getTopAiringAnimes() {
    try {
      const request = await fetch(`/api/home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const response = await request.json()
      // console.log(response)

      if (request.status === 200) {
        setTopiring(response.topAiringAnimes)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTopAiringAnimes()
  }, [])
  return (
    <section className="container">
      <p style={{ padding: "5px 0" }}>Top Airing</p>
      <section className={cardio.cardsContainer}>
        {topAiring.slice(0, 12).map(({ id, name, poster, episodes }, idx) => {
          return (
            <Card
              key={idx}
              id={id}
              title={name}
              image={poster}
              subCount={episodes.sub}
              dubCount={episodes.dub}
            />
          )
        })}
      </section>
    </section>
  )
}
