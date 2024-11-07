import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await database()
    await redis.Connect()

    const { animeId } = await request.json()
    const cache_Key = `info_${animeId}`
    const cachedData = await client.get(cache_Key)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, { status: 200 })
    }

    console.warn("[REDIS] Cache miss")

    const info = await Anime.findOne({ anilistId: animeId }).populate({
      path: "recommendations",
      model: "ANIME",
    })

    if (info) {
      await client.set(cache_Key, JSON.stringify(info), { EX: 86400 }) // 24 hrs
      return new Response(JSON.stringify(info), { status: 200 })
    } else {
      return new Response(JSON.stringify({ message: "Anime not found" }), {
        status: 404,
      })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    })
  }
}
