import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await database()
    await redis.Connect()

    const { animeId } = await request.json()

    const resp = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/anime/${animeId}`
    )
    const { data } = await resp.json()

    const episodes = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/anime/${animeId}/episodes`
    )
    const episodesJSON = await episodes.json()

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
