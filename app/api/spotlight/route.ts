import { client, redis } from "@/utils/redis"

export async function GET(request: Request) {
  try {
    await redis.Connect()
    const cache_Key = `spotlight_69`
    const cacheResp = await client.get(cache_Key)
    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }
    const data = await fetch(`${process.env.HIANIME}/api/v2/hianime/home`)
    const response = await data.json()

    await client.set(cache_Key, JSON.stringify(response.data.spotlightAnimes), {
      EX: 12000,
    })
    return new Response(JSON.stringify(response.data.spotlightAnimes), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
