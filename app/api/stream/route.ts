import { HiAnime } from "aniwatch"

export async function POST(request: Request) {
  const { subEpisodeId } = await request.json()
  const hianime = new HiAnime.Scraper()

  try {
    // Fetch subtitles (sub) data
    const sub = await hianime.getEpisodeSources(subEpisodeId, "hd-1", "sub")

    let dub = null

    try {
      // Fetch dubbed (dub) data
      const dubRequest = await hianime.getEpisodeSources(
        subEpisodeId,
        "hd-1",
        "dub"
      )
      dub = dubRequest
    } catch (dubError) {
      console.error("Error fetching dub sources:", dubError)
      dub = null
    }

    return new Response(JSON.stringify({ sub: sub, dub }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching episode sources:", error)

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
