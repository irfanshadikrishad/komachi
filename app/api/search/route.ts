import { database } from "@/utils/database";
import Anime from "@/schema/anime";

export async function POST(request: Request) {
  try {
    await database();
    const {
      query,
      format,
      genre,
      year,
      origin,
      season,
      status,
      perPage = 5,
    } = await request.json();

    const searchConditions = [];

    if (query) {
      searchConditions.push({
        $or: [
          { "title.english": { $regex: query, $options: "i" } },
          { "title.romaji": { $regex: query, $options: "i" } },
          { "title.native": { $regex: query, $options: "i" } },
          { synonyms: { $elemMatch: { $regex: query, $options: "i" } } },
        ],
      });
    }

    if (status.length > 0) {
      searchConditions.push({ status: status });
    }
    if (format.length > 0) {
      searchConditions.push({ format: format });
    }
    if (origin.length > 0) {
      searchConditions.push({ origin: origin });
    }
    if (genre.length > 0) {
      searchConditions.push({ genres: { $in: genre } });
    }
    if (year.length > 0) {
      searchConditions.push({ "airing_start.year": year });
    }
    if (season.length > 0) {
      searchConditions.push({ season: season });
    }

    const queryObject =
      searchConditions.length > 1
        ? { $and: searchConditions }
        : searchConditions[0] || {};

    const results = await Anime.find(queryObject).limit(perPage);

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
