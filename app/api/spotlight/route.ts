import { client, redis } from "@/utils/redis"

export async function GET() {
  const cache_Key = `spotlight_6x9`
  const errorCacheKey = `error_${cache_Key}`

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

    const data = await fetch(`${process.env.HIANIME}/api/v2/hianime/home`)
    if (!data.ok) {
      throw new Error(`Failed to fetch data: ${data.statusText}`)
    }

    const response = await data.json()
    const spotlightAnimes = response?.data?.spotlightAnimes

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
