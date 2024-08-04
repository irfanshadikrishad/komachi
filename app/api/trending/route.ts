import { database } from "@/utils/database";
import Anime from "@/schema/anime";

// Named export for the GET method
export const POST = async (req: Request) => {
  try {
    await database();
    const { page = 1, perPage = 10 } = await req.json();
    const results = await Anime.find().sort({ anilistId: 1 }).limit(perPage);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
