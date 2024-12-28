import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await database()
    await redis.Connect()

    const { animeId } = await request.json()
    const cache_Key = `Info_${animeId}69`

    const cacheResponse = await client.get(cache_Key)
    if (cacheResponse) {
      console.warn(`[redis] Cache hit`, cacheResponse)
      return new Response(cacheResponse, {
        status: 200,
      })
    }
    console.warn(`[redis] Cache miss`)

    const resp = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/anime/${animeId}`
    )
    const { data } = await resp.json()

    const episodes = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/anime/${animeId}/episodes`
    )
    const episodesJSON = await episodes.json()

    await client.set(
      cache_Key,
      JSON.stringify({ info: data, episodes: episodesJSON.data }),
      { EX: 43200 }
    )

    return new Response(
      JSON.stringify({ info: data, episodes: episodesJSON.data }),
      {
        status: 200,
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    })
  }
}
