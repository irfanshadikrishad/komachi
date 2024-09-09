import Anime from "@/schema/anime";
import { database } from "@/utils/database";

export async function POST(request: Request) {
  try {
    const { show, page = 1, perPage = 10 } = await request.json();
    await database();

    if (show === "all") {
      const results = await Anime.aggregate([
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
        { $sort: { sortKey: 1, "title.english": 1 } },
        { $skip: (page - 1) * perPage },
        { $limit: perPage },
      ]);

      return new Response(JSON.stringify(results), { status: 200 });
    } else if (show === "0-9") {
      const results = await Anime.aggregate([
        {
          $addFields: {
            sortKey: {
              $cond: [
                {
                  $regexMatch: {
                    input: { $substrCP: ["$title.english", 0, 1] },
                    regex: /^[0-9]/,
                  },
                },
                1,
                2,
              ],
            },
          },
        },
        { $match: { sortKey: 1 } },
        { $sort: { sortKey: 1, "title.english": 1 } },
        { $skip: (page - 1) * perPage },
        { $limit: perPage },
      ]);

      return new Response(JSON.stringify(results), { status: 200 });
    } else if (/^[a-zA-Z]$/.test(show)) {
      const results = await Anime.aggregate([
        {
          $match: {
            "title.english": { $regex: new RegExp(`^${show}`, "i") },
          },
        },
        { $sort: { "title.english": 1 } },
        { $skip: (page - 1) * perPage },
        { $limit: perPage },
      ]);

      return new Response(JSON.stringify(results), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Invalid 'show' parameter" }), {
      status: 400,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
