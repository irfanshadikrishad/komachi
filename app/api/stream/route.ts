import { client, redis } from "@/utils/redis"
import { ANIME } from "@consumet/extensions"

export async function POST(request: Request) {
  const gogoanime = new ANIME.Gogoanime()
  const { subEpisodeId, dubEpisodeId } = await request.json()

  try {
    await redis.Connect()

    const cacheKey = `stream:${subEpisodeId}.${dubEpisodeId || "none"}`
    const cachedData = await client.get(cacheKey)

    if (cachedData) {
      return new Response(cachedData, { status: 200 })
    }

    const subLink = await gogoanime.fetchEpisodeSources(subEpisodeId)

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

    const responseData = { subLink, dubLink: dubLink?.sources ? dubLink : null }
    await client.set(cacheKey, JSON.stringify(responseData), { EX: 43200 }) // 12hrs

    return new Response(JSON.stringify(responseData), { status: 200 })
  } catch (error) {
    console.error(
      "Error fetching episode sources:",
      error,
      subEpisodeId,
      dubEpisodeId
    )

    return new Response(
      JSON.stringify({ error: "Failed to fetch episode sources" }),
      { status: 400 }
    )
  }
}
