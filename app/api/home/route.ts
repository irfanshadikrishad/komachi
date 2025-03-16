import { client, redis } from "@/utils/redis"
import { HiAnime } from "aniwatch"

export async function POST(request: Request) {
  const hianime = new HiAnime.Scraper()

  try {
    await redis.Connect()

    const cache_Key = `h0me_69`
    const cacheResp = await client.get(cache_Key)

    if (cacheResp) {
      return new Response(cacheResp, {
        status: 200,
      })
    }

    const data = await hianime.getHomePage()

    await client.set(cache_Key, JSON.stringify(data), { EX: 10800 })

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
