import { ANIME } from "@consumet/extensions";

export async function POST(request: Request) {
  const gogoanime = new ANIME.Gogoanime();
  const { episodeId } = await request.json();
  try {
    const streaminLinks = await gogoanime.fetchEpisodeSources(episodeId);
    return new Response(JSON.stringify(streaminLinks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
}
