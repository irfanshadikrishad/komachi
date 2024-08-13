import { database } from "@/utils/database";
import Anime from "@/schema/anime";

export async function GET(request: Request) {
  try {
    await database();
    const random_Anime = await Anime.aggregate([{ $sample: { size: 1 } }]);
    return new Response(JSON.stringify(random_Anime), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error || "An error occurred" }),
      { status: 400 }
    );
  }
}
