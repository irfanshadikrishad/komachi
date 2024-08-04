import { database } from "@/utils/database";
import Anime from "@/schema/anime";

export async function GET(request: Request) {
  try {
    await database();
    const total_Animes = await Anime.find({});
    const random_number =
      Math.floor(Math.random() * (total_Animes.length - 1 + 1)) + 1;
    const random_Anime = await Anime.find({}).skip(random_number).limit(1);
    return new Response(JSON.stringify(random_Anime), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 400 });
  }
}
