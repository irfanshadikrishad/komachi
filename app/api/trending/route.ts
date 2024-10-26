import Anime from "@/schema/anime"
import { database } from "@/utils/database"

export const POST = async (req: Request) => {
  try {
    await database()
    const { page = 1, perPage = 10 } = await req.json()

    // AniList GraphQL query to get trending anime
    const query = `query ($page: Int, $perPage: Int) {
                    Page(page: $page, perPage: $perPage) {
                      media(type: ANIME, sort: TRENDING_DESC) {
                        id
                        title {
                          romaji
                          english
                          native
                          userPreferred
                        }
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

    // Get list of anilist IDs from AniList API
    const anilistIds = data?.Page?.media.map((item: { id: number }) =>
      item.id.toString()
    )

    // Get the pagination information from AniList API pageInfo
    const { total, currentPage, lastPage } = data.Page.pageInfo

    // Query MongoDB for corresponding anime by anilistId and sort based on their order from AniList
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

    // Return the results along with pagination info from AniList
    return new Response(
      JSON.stringify({
        results,
        totalCount: total,
        totalPages: lastPage,
        currentPage,
        perPage,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
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
