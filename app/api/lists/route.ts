import Anime from "@/schema/anime"
import { database } from "@/utils/database"

export async function POST(request: Request) {
  try {
    const { show, page = 1, perPage = 10 } = await request.json()
    await database()

    let matchCondition = {}

    if (show === "all") {
      matchCondition = {}
    } else if (show === "0-9") {
      matchCondition = {
        "title.english": { $regex: /^[0-9]/ },
      }
    } else if (/^[a-zA-Z]$/.test(show)) {
      matchCondition = {
        "title.english": { $regex: new RegExp(`^${show}`, "i") },
      }
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid 'show' parameter" }),
        {
          status: 400,
        }
      )
    }

    // Get total count for the match condition
    const totalCount = await Anime.countDocuments(matchCondition)
    const totalPages = Math.ceil(totalCount / perPage)

    // Handle cases where the requested page exceeds total pages
    const currentPage = Math.min(page, totalPages)

    const results = await Anime.aggregate([
      { $match: matchCondition },
      {
        $addFields: {
          sortKey: {
            $switch: {
              branches: [
                {
                  case: {
                    $regexMatch: {
                      input: { $substrCP: ["$title.english", 0, 1] },
                      regex: /[!-/:-@[-`{-~]/,
                    },
                  },
                  then: 1,
                },
                {
                  case: {
                    $regexMatch: {
                      input: { $substrCP: ["$title.english", 0, 1] },
                      regex: /[0-9]/,
                    },
                  },
                  then: 2,
                },
                {
                  case: {
                    $regexMatch: {
                      input: { $substrCP: ["$title.english", 0, 1] },
                      regex: /[a-zA-Z]/,
                    },
                  },
                  then: 3,
                },
              ],
              default: 4,
            },
          },
        },
      },
      { $sort: { "sortKey": 1, "title.english": 1 } },
      { $skip: (currentPage - 1) * perPage },
      { $limit: perPage },
    ])

    return new Response(
      JSON.stringify({
        results,
        totalCount,
        totalPages,
        currentPage,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in POST handler:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}
