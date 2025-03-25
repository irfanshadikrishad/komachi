import { HiAnime } from "aniwatch"

export async function POST(request: Request) {
  const { subEpisodeId } = await request.json()
  const hianime = new HiAnime.Scraper()

  try {
    let dub = null
    const sub = await hianime.getEpisodeSources(subEpisodeId, "hd-2", "sub")

    try {
      const dub_request = await hianime.getEpisodeSources(
        subEpisodeId,
        "hd-2",
        "dub"
      )
      dub = dub_request
    } catch (err) {
      console.log(`${(err as Error).message}`)
    }

    return new Response(JSON.stringify({ sub: sub, dub }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `${(error as Error).message}`,
        message: `Internal Server Error!`,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
