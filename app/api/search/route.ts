import Anime from "@/schema/anime";
import { partial_ratio } from "fuzzball";
import { database } from "@/utils/database";

export async function POST(request: Request) {
  try {
    await database();
    const { query, page = 1, perPage = 60 } = await request.json();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required." }), {
        status: 400,
      });
    }

    // Build the query
    const searchQuery = {
      $or: [
        {
          "title.english": {
            $regex: query.split(" ").join(".*"),
            $options: "i",
          },
        },
        {
          "title.romaji": {
            $regex: query.split(" ").join(".*"),
            $options: "i",
          },
        },
        {
          "title.native": {
            $regex: query.split(" ").join(".*"),
            $options: "i",
          },
        },
      ],
    };

    // Pagination setup
    const skip = (page - 1) * perPage;

    // Execute the search
    let results = await Anime.find(searchQuery)
      .select("anilistId title poster sub_episodes dub_episodes isAdult")
      .skip(skip)
      .limit(perPage)
      .lean();

    // Fuzzy matching to further filter results
    results = results.filter((result) => {
      const titles = [
        result.title.english,
        result.title.romaji,
        result.title.native,
      ];
      return titles.some(
        (title) => partial_ratio(query.toLowerCase(), title?.toLowerCase()) > 80
      );
    });

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred while searching." }),
      { status: 500 }
    );
  }
}
