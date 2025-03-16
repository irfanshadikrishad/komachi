import { client, redis } from "@/utils/redis"
import { HiAnime } from "aniwatch"

export async function POST(request: Request) {
  try {
    await redis.Connect()
    const hianime = new HiAnime.Scraper()

    const cache_Key = `rec_90`
    const cacheResp = await client.get(cache_Key)

    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }

    const data = await hianime.getHomePage()

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
