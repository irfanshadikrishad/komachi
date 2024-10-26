import { ANIME } from "@consumet/extensions"

export async function POST(request: Request) {
  const gogoanime = new ANIME.Gogoanime()
  const { subEpisodeId, dubEpisodeId } = await request.json()

  try {
    // Fetch subbed episode source
    const subLink = await gogoanime.fetchEpisodeSources(subEpisodeId)

    // Fetch dubbed episode source, only if dubEpisodeId exists
    let dubLink = null
    if (dubEpisodeId) {
      try {
        dubLink = await gogoanime.fetchEpisodeSources(dubEpisodeId)
      } catch (dubError) {
        console.warn(
          "Dub link not found or failed to fetch:",
          dubEpisodeId,
          dubError
        )
      }
    }

    return new Response(
      JSON.stringify({ subLink, dubLink: dubLink?.sources ? dubLink : null }),
      { status: 200 }
    )
  } catch (error) {
    console.error(
      "Error fetching episode sources:",
      error,
      subEpisodeId,
      dubEpisodeId
    )

    return new Response(
      JSON.stringify({ error: "Failed to fetch episode sources" }),
      {
        status: 400,
      }
    )
  }
}
