import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export const POST = async (req: Request) => {
  try {
    await database()
    await redis.Connect()

    const { page = 1, perPage = 10 } = await req.json()
    const cache_Key = `popular_${page}.${perPage}`
    let cachedData = await client.get(cache_Key)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, { status: 200 })
    }

    console.warn("[REDIS] Cache miss")

    const query = `query ($page: Int, $perPage: Int) {
                    Page(page: $page, perPage: $perPage) {
                      media(type: ANIME, sort: POPULARITY_DESC) {
                        id
                      }
                      pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                      }
                    }
                  }`

    const request = await fetch(`https://graphql.anilist.co`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { page, perPage },
      }),
    })

    const { data } = await request.json()
    const anilistIds = data?.Page?.media.map((item: { id: number }) =>
      item.id.toString()
    )

    const { total, currentPage, lastPage } = data.Page.pageInfo

    const results = await Anime.aggregate([
      {
        $match: { anilistId: { $in: anilistIds } },
      },
      {
        $addFields: {
          sortOrder: {
            $indexOfArray: [anilistIds, "$anilistId"],
          },
        },
      },
      {
        $sort: { sortOrder: 1 },
      },
      {
        $project: {
          sortOrder: 0,
        },
      },
    ])

    const responseData = JSON.stringify({
      results,
      totalCount: total,
      totalPages: lastPage,
      currentPage,
      perPage,
    })

    await client.set(cache_Key, responseData, { EX: 21600 })

    return new Response(responseData, {
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
