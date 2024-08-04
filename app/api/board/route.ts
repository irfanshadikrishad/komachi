import { database } from "@/utils/database";
import Anime from "@/schema/anime";

// Named export for the GET method
export const GET = async (req: Request) => {
  try {
    await database();
    const board = await Anime.find({}).sort({ updatedAt: -1 }).limit(5);
    return new Response(JSON.stringify(board), {
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
