export async function POST(request: Request) {
  const { subEpisodeId } = await request.json()

  try {
    // Fetch subtitles (sub) data
    const subRequest = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/episode/sources?animeEpisodeId=${subEpisodeId}&category=sub`
    )
    const sub = await subRequest.json()

    let dub = null

    try {
      // Fetch dubbed (dub) data
      const dubRequest = await fetch(
        `${process.env.HIANIME}/api/v2/hianime/episode/sources?animeEpisodeId=${subEpisodeId}&category=dub`
      )
      const dubData = await dubRequest.json()
      dub = dubData.data // Only assign if successful
    } catch (dubError) {
      console.error("Error fetching dub sources:", dubError)
      dub = null // Explicitly set dub to null on error
    }

    return new Response(JSON.stringify({ sub: sub.data, dub }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching episode sources:", error)

    return new Response(
      JSON.stringify({ error: "Failed to fetch episode sources" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
