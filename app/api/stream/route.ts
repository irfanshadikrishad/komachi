import { ANIME } from "@consumet/extensions";

export async function POST(request: Request) {
  const gogoanime = new ANIME.Gogoanime();
  const { subEpisodeId, dubEpisodeId } = await request.json();

  try {
    const subLink = await gogoanime.fetchEpisodeSources(subEpisodeId);
    const dubLink = dubEpisodeId
      ? await gogoanime.fetchEpisodeSources(dubEpisodeId)
      : null;
    return new Response(JSON.stringify({ subLink, dubLink }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
    });
  }
}
