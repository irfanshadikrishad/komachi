import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function GET() {
  try {
    await database()
    await redis.Connect()

    const cacheKey = "anime_statistics"
    const cachedData = await client.get(cacheKey)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.warn("[REDIS] Cache miss")

    const totalAnimes = await Anime.find({})
    const totalOngoing = await Anime.find({ status: "Ongoing" })

    const responseData = {
      total_animes: totalAnimes.length,
      total_ongoing: totalOngoing.length,
    }

    await client.set(cacheKey, JSON.stringify(responseData), { EX: 21600 })

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
