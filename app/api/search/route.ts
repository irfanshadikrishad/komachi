import { database } from "@/utils/database";
import Anime from "@/schema/anime";

export async function POST(request: Request) {
  try {
    await database();
    const { query, page = 1, perPage = 60 } = await request.json();
    const results = await Anime.find({
      $or: [
        { "title.english": { $regex: query, $options: "i" } },
        { "title.romaji": { $regex: query, $options: "i" } },
        { "title.native": { $regex: query, $options: "i" } },
      ],
    }).limit(perPage);
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
}
