import { database } from "@/utils/database";
import Anime from "@/schema/anime";

// Named export for the GET method
export const POST = async (req: Request) => {
  try {
    await database();
    const { page = 1 } = await req.json();
    const recent = await Anime.find({}).sort({ updatedAt: -1 }).limit(24);
    return new Response(JSON.stringify(recent), {
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
