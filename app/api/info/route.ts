import { client, redis } from "@/utils/redis"
import { HiAnime } from "aniwatch"

export async function POST(request: Request) {
  try {
    const hianime = new HiAnime.Scraper()
    await redis.Connect()

    const { animeId } = await request.json()
    const cache_Key = `Info.${animeId}69`

    const cacheResponse = await client.get(cache_Key)
    if (cacheResponse) {
      console.warn(`[redis] Cache hit`)
      return new Response(cacheResponse, {
        status: 200,
      })
    }
    console.warn(`[redis] Cache miss`)

    const data = await hianime.getInfo(animeId)

    const episodes = await hianime.getEpisodes(animeId)

    await client.set(
      cache_Key,
      JSON.stringify({ info: data, episodes: episodes }),
      { EX: 43200 }
    )

    return new Response(JSON.stringify({ info: data, episodes: episodes }), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    })
  }
}
