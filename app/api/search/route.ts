import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await redis.Connect()

    const {
      query,
      format,
      genre,
      year,
      origin,
      season,
      status,
      page = 1,
      perPage = 5,
    } = await request.json()
    const cache_Key = `search_${query}_${page}`
    const cacheResp = await client.get(cache_Key)
    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }

    const resp = await fetch(
      `${process.env.HIANIME}/api/v2/hianime/search?q=${query}&page=${page}`
    )
    const data = await resp.json()

    await client.set(cache_Key, JSON.stringify(data), { EX: 42600 })
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: (error as Error).message || error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
