import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await database()
    await redis.Connect()

    const {
      query,
      format,
      genre,
      year,
      origin,
      season,
      status,
      page = 1,
      perPage = 5,
    } = await request.json()

    const cacheKey = `anime_search:${JSON.stringify({
      query,
      format,
      genre,
      year,
      origin,
      season,
      status,
      page,
      perPage,
    })}`

    let cachedData = await client.get(cacheKey)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.warn("[REDIS] Cache miss")

    const searchConditions = []

    if (query) {
      searchConditions.push({
        $or: [
          { "title.english": { $regex: query, $options: "i" } },
          { "title.romaji": { $regex: query, $options: "i" } },
          { "title.native": { $regex: query, $options: "i" } },
          { synonyms: { $elemMatch: { $regex: query, $options: "i" } } },
        ],
      })
    }

    if (status.length > 0) {
      searchConditions.push({ status: { $in: status } })
    }
    if (format.length > 0) {
      searchConditions.push({ format: { $in: format } })
    }
    if (origin.length > 0) {
      searchConditions.push({ origin: { $in: origin } })
    }
    if (genre.length > 0) {
      searchConditions.push({ genres: { $in: genre } })
    }
    if (year.length > 0) {
      searchConditions.push({ "airing_start.year": { $in: year } })
    }
    if (season.length > 0) {
      searchConditions.push({ season: { $in: season } })
    }

    const queryObject =
      searchConditions.length > 1
        ? { $and: searchConditions }
        : searchConditions[0] || {}

    const skip = (page - 1) * perPage
    const results = await Anime.find(queryObject).skip(skip).limit(perPage)
    const totalCount = await Anime.countDocuments(queryObject)

    const responseBody = {
      results,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage),
      currentPage: page,
    }

    await client.set(cacheKey, JSON.stringify(responseBody), { EX: 21600 })

    if (results.length === 0) {
      return new Response(JSON.stringify({ message: "0 results found" }), {
        status: 404,
      })
    } else {
      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: (error as Error).message || error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
