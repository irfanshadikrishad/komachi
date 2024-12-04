import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await database()
    await redis.Connect()

    const { genre, page = 1, perPage = 60 } = await request.json()
    const cache_Key = `genre.${page}.${perPage}`

    let cachedData = await client.get(cache_Key)
    if (cachedData) {
      cachedData = JSON.parse(cachedData)
      return new Response(JSON.stringify(cachedData), { status: 200 })
    }

    if (!genre) {
      return new Response(
        JSON.stringify({ error: `No genre specified!`, genre }),
        {
          status: 500,
        }
      )
    }

    const skip = (page - 1) * perPage
    const genreAnimes = await Anime.find({
      genres: { $in: [decodeURIComponent(genre)] },
    })
      .skip(skip)
      .limit(perPage)
    const totalDocuments = await Anime.countDocuments({
      genres: { $in: [decodeURIComponent(genre)] },
    })
    const totalPages = Math.ceil(totalDocuments / perPage)

    const response = {
      success: true,
      data: genreAnimes,
      pagination: {
        totalPages: totalPages,
        currentPage: page,
        perPage,
        totalItems: totalDocuments,
      },
    }

    await client.set(cache_Key, JSON.stringify(response), {
      EX: 43200,
    })

    return new Response(JSON.stringify(response), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
