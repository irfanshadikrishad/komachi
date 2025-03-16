import { client, redis } from "@/utils/redis"
import { HiAnime } from "aniwatch"

const hianime = new HiAnime.Scraper()

export async function POST(req: Request) {
  try {
    await redis.Connect()

    const { episodeId } = await req.json()
    const cacheKey = `gogo.sources.${episodeId}`

    const cachedData = await client.get(cacheKey)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const sources = await hianime.getEpisodeServers(episodeId)

    await client.set(cacheKey, JSON.stringify(sources), { EX: 3600 })

    return new Response(JSON.stringify(sources), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error getting sources", error: error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
