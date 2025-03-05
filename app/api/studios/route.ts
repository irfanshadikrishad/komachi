import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await database()
    await redis.Connect()

    const { studio, page = 1, perPage = 60 } = await request.json()
    const cache_Key = `studio.${page}.${perPage}.${studio}`

    // Check cache
    let cachedData = await client.get(cache_Key)
    if (cachedData) {
      console.warn(`[REDIS] Cache hit`)
      cachedData = JSON.parse(cachedData)
      return new Response(JSON.stringify(cachedData), {
        status: 200,
      })
    }
    console.warn(`[REDIS] ${cache_Key} Cache miss`)

    // Validate input
    if (!studio) {
      console.log(`Studio is required, ${decodeURIComponent(studio)}`)
      return new Response(JSON.stringify({ error: "Studio is required" }), {
        status: 400,
      })
    }

    // Calculate skip value
    const skip = (page - 1) * perPage

    // Query the database with pagination
    const animes = await Anime.find({
      studios: { $in: [decodeURIComponent(studio)] },
    })
      .skip(skip)
      .limit(perPage)

    // Count total documents for this query (for total pages calculation)
    const totalDocuments = await Anime.countDocuments({
      studios: { $in: [decodeURIComponent(studio)] },
    })
    const totalPages = Math.ceil(totalDocuments / perPage)

    // Structure the response
    const responseData = {
      success: true,
      data: animes,
      pagination: {
        currentPage: page,
        perPage,
        totalPages,
        totalItems: totalDocuments,
      },
    }

    // Cache the response
    await client.set(cache_Key, JSON.stringify(responseData), {
      EX: 43200, // 12 hours
    })

    return new Response(JSON.stringify(responseData), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
