import { client, redis } from "@/utils/redis"
import { HiAnime } from "aniwatch"

export async function GET() {
  const cache_Key = `spotlight_6x9`
  const errorCacheKey = `error_${cache_Key}`
  const hianime = new HiAnime.Scraper()

  try {
    await redis.Connect()

    const cachedError = await client.get(errorCacheKey)
    if (cachedError) {
      return new Response(cachedError, { status: 500 })
    }

    const cachedResponse = await client.get(cache_Key)
    if (cachedResponse) {
      return new Response(cachedResponse, { status: 200 })
    }

    const data = await hianime.getHomePage()

    const spotlightAnimes = data?.spotlightAnimes

    await client.set(cache_Key, JSON.stringify(spotlightAnimes), {
      EX: 1200,
    })

    return new Response(JSON.stringify(spotlightAnimes), { status: 200 })
  } catch (error) {
    const errorMessage = JSON.stringify({ error: (error as Error).message })

    await client.set(errorCacheKey, errorMessage, { EX: 1200 })

    return new Response(errorMessage, { status: 500 })
  }
}
