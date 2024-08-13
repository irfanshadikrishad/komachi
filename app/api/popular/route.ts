import { database } from "@/utils/database";
import Anime from "@/schema/anime";

export const POST = async (req: Request) => {
  try {
    await database();
    const { page = 1, perPage = 10 } = await req.json();
    const results = await Anime.aggregate([
      {
        $addFields: {
          anilistIdNumeric: { $toInt: "$anilistId" },
        },
      },
      {
        $sort: { anilistIdNumeric: 1 },
      },
      {
        $limit: perPage,
      },
    ]);

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
