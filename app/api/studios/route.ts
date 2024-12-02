import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await database()
    await redis.Connect()

    const { studio, page = 1, perPage = 60 } = await request.json()
    const cache_Key = `studios.${page}.${perPage}.${studio}`

    let cachedData = await client.get(cache_Key)
    if (cachedData) {
      console.warn(`[REDIS] Cache hit`)
      cachedData = JSON.parse(cachedData)
      return new Response(JSON.stringify(cachedData), {
        status: 200,
      })
    }
    console.warn(`[REDIS] ${cache_Key} Cache miss`)

    if (!studio) {
      console.log(`Studio is required, ${decodeURIComponent(studio)}`)

      return new Response(JSON.stringify({ error: "Studio is required" }), {
        status: 400,
      })
    }

    const animes = await Anime.find({
      studios: { $in: [decodeURIComponent(studio)] },
    })

    await client.set(
      cache_Key,
      JSON.stringify({ success: true, data: animes }),
      {
        EX: 43200, // 12hrs
      }
    )

    return new Response(JSON.stringify({ success: true, data: animes }), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
