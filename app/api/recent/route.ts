import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export const POST = async (req: Request) => {
  try {
    await database()
    await redis.Connect()

    const { page = 1, perPage = 24 } = await req.json()
    const cache_Key = `re_${page}-${perPage}`

    // Check if the data is in the cache
    let cachedData = await client.get(cache_Key)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.warn("[REDIS] Cache miss")

    const skip = (page - 1) * perPage

    const all = await Anime.find({})
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    const japan = await Anime.find({ origin: "JP" })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    const china = await Anime.find({ origin: "CN" })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    const korea = await Anime.find({ origin: "KR" })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(perPage)

    const responseData = {
      page,
      perPage,
      all,
      japan,
      china,
      korea,
    }

    await client.set(cache_Key, JSON.stringify(responseData), {
      EX: 300,
    })

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
