import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"
import { ANIME } from "@consumet/extensions"

const gogoanime = new ANIME.Gogoanime()

export async function POST(req: Request) {
  try {
    await database()
    await redis.Connect()

    const { episodeId } = await req.json()
    const cacheKey = `gogo.sources.${episodeId}`

    let cachedData = await client.get(cacheKey)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.warn("[REDIS] Cache miss")

    const sources = await gogoanime.fetchEpisodeServers(episodeId)

    await client.set(cacheKey, JSON.stringify(sources), { EX: 21600 })

    return new Response(JSON.stringify(sources), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error getting sources", error: error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
