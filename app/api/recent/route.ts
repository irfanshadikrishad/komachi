import { client, redis } from "@/utils/redis"

export async function POST(request: Request) {
  try {
    await redis.Connect()

    const cache_Key = `rec_69`
    const cacheResp = await client.get(cache_Key)

    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }

    const resp = await fetch(`${process.env.HIANIME}/api/v2/hianime/home`)
    const { data } = await resp.json()

    await client.set(cache_Key, JSON.stringify(data.latestEpisodeAnimes), {
      EX: 10800,
    })

    return new Response(JSON.stringify(data.latestEpisodeAnimes), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
