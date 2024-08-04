import { database } from "@/utils/database";
import { ANIME } from "@consumet/extensions";

const gogoanime = new ANIME.Gogoanime();

export async function POST(req: Request) {
  try {
    await database();
    const { episodeId } = await req.json();
    const sources = await gogoanime.fetchEpisodeServers(episodeId);
    return new Response(JSON.stringify(sources), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `error getting sources`, error: error })
    );
  }
}
