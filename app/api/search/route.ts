import Anime from "@/schema/anime";
import { database } from "@/utils/database";

export async function POST(request: Request) {
  try {
    await database();
    const { query, page = 1, perPage = 60 } = await request.json();

    const results = await Anime.find({
      $or: [
        {
          "title.english": { $regex: query, $options: "i" },
        },
        {
          "title.romaji": { $regex: query, $options: "i" },
        },
        {
          "title.native": { $regex: query, $options: "i" },
        },
        {
          anilistId: { $regex: query, $options: "i" },
        },
      ],
    }).limit(perPage);
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred while searching." }),
      { status: 500 }
    );
  }
}
