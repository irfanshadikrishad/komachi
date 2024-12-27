import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    const { show, page = 1 } = await request.json()
    await redis.Connect()
    const cache_Key = `$lists_${show}_${page}`
    const cacheResp = await client.get(cache_Key)
    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }

    const resp = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/azlist/${show}?page=${page}`
    )
    const { data } = await resp.json()

    await client.set(cache_Key, JSON.stringify(data), { EX: 43200 })

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
        message: `${(error as Error).message}`,
      }),
      {
        status: 500,
      }
    )
  }
}
